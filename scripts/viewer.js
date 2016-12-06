;(function() {
	require("../styles/viewer/viewer.css");
	require("../styles/viewer/themes/default.css");

	const config = require("./config/viewer");
	const fileLoader = require("./utils/file_loader");
	const markdown = require("markdown-it")(config.markdownit);

	markdown.use(require("markdown-it-lazy-headers"));
	if (config.mathRenderer === "MathJax") {
		markdown.use(require("markdown-it-mathjax"));
		fileLoader.getScript(config.mathjaxUrl, loadMathJax);
	} else if (config.mathRenderer === "KaTex") {
		markdown.use(require("markdown-it-katex"), config.KaTex);
	}
	if (config.markdownit.html) {
		markdown.use(require("markdown-it-sanitizer"), config.markdownitSanitizer);
	}
	if (config.highlightjsStyle) {
		fileLoader.getStyle(`build/lib/highlight.js/styles/${config.highlightjsStyle}.css`, "");
	}

	let renderTimeout;
	let viewer;
	let mathjaxReady;

	// Render the specified Markdown and insert the resulting HTML into the viewer.
	function render(markdownString, callback) {
		const result = markdown.render(markdownString || "");
		viewer.innerHTML = result;
		if (mathjaxReady) {
			MathJax.Hub.Queue(["Typeset", MathJax.Hub, viewer]);
		}
		if (callback) {
			callback();
		}
	}

	// Wait for the user to stop typing before rendering the Markdown.
	function delayedRender(markdownString, callback) {
		clearTimeout(renderTimeout);
		renderTimeout = setTimeout(function() {
			render(markdownString);
			if (callback) {
				callback();
			}
		}, config.renderDelay);
	}

	// Load and setup MathJax with the config.
	function loadMathJax() {
		MathJax.Hub.Config(config.MathJax);
		mathjaxReady = true;
	}

	module.exports = function(viewerElement) {
		viewer = viewerElement;

		if (config.useDelayedRendering) {
			module.render = delayedRender;
		} else {
			module.render = render;
		}

		return module;
	};
}());
