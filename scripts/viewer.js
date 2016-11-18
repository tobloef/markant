;(function() {
	require("../styles/viewer/viewer.css");
	require("../styles/viewer/themes/default.css");

	const config = require("./config/viewer");
	const $ = require("jquery");
	const fileLoader = require("./utils/file_loader");
	const markdown = require("markdown-it")(config.markdownit);
	if (config.highlightjsStyle) {
		fileLoader.getStyle(`build/lib/highlight.js/styles/${config.highlightjsStyle}.css`, "");
	}
	markdown.use(require("markdown-it-lazy-headers"));
	if (config.mathRenderer == "MathJax") {
		markdown.use(require("markdown-it-mathjax"));
		fileLoader.getScript(config.mathjaxUrl, loadMathJax);
	} else if (config.mathRenderer == "KaTex") {
		markdown.use(require("markdown-it-katex"), config.KaTex);
	}

	let renderTimeout;
	let viewer;
	let mathjaxReady;

	// Render the specified Markdown and insert the resulting HTML into the viewer.
	function render(markdownString) {
		const result = markdown.render(markdownString || "");
		viewer.innerHTML = result;
		if (mathjaxReady) {
			MathJax.Hub.Queue(["Typeset", MathJax.Hub, viewer]);
		}
	}

	// Wait for the user to stop typing before rendering the Markdown.
	function delayedRender(markdownString) {
		clearTimeout(renderTimeout);
		renderTimeout = setTimeout(function() {
			render(markdownString);
		}, config.renderDelay);
	}

	// Highlight code snippets with highlight.js
	function highlight(str, lang) {
		console.log("highlight");
		if (lang && hljs.getLanguage(lang)) {
			try {
				return "<pre class='hljs'><code>" +
       				   hljs.highlight(lang, str, true).value +
       				   "</code></pre>";
			} catch (exception) {
				console.log("Couldn't highlight code with language " + lang, exception);
			}
		}
		return "<pre class='hljs'><code>" + markdown.utils.escapeHtml(str) + "</code></pre>";
	}

	// Load and setup MathJax with the config.
	function loadMathJax() {
		MathJax.Hub.Config(config.MathJax);
		mathjaxReady = true;
	}

	module.exports = function() {
		viewer = $(`#${config.viewerElementId}`).get(0);

		const module = {
			highlight
		};

		if (config.useDelayedRendering) {
			module.render = delayedRender;
		} else {
			module.render = render;
		}

		return module;
	};
}());
