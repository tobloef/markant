;(function() {
	require("../styles/viewer/viewer.css");
	require("../styles/viewer/themes/default.css");

	const config = require("./config/viewer");
	const $ = require("jquery");
	const fileLoader = require("./utils/file_loader");
	const md = require("markdown-it")(config.markdownit);
	if (config.highlightjsStyle) {
		fileLoader.getStyle(`build/lib/highlight.js/styles/${config.highlightjsStyle}.css`, "");
	}
	md.use(require("markdown-it-lazy-headers"));
	if (config.mathRenderer == "MathJax") {
		md.use(require("markdown-it-mathjax"));
		fileLoader.getScript(config.mathjaxUrl, loadMathJax);
	} else if (config.mathRenderer == "KaTex") {
		md.use(require("markdown-it-katex"), config.KaTex);
	}

	let renderTimeout;
	let viewer;
	let mathjaxReady;

	// Render the specified Markdown and insert the resulting HTML into the viewer.
	function render(markdown) {
		const result = md.render(markdown || "");
		viewer.innerHTML = result;
		if (mathjaxReady) {
			MathJax.Hub.Queue(["Typeset", MathJax.Hub, viewer]);
		}
	}

	// Wait for the user to stop typing before rendering the Markdown.
	function delayedRender(markdown) {
		clearTimeout(renderTimeout);
		renderTimeout = setTimeout(function() {
			render(markdown);
		}, config.renderDelay);
	}

	// Load and setup MathJax with the config.
	function loadMathJax() {
		MathJax.Hub.Config(config.MathJax);
		mathjaxReady = true;
	}

	module.exports = function() {
		const module = {};

		viewer = $(`#${config.viewerElementId}`).get(0);

		if (config.useDelayedRendering) {
			module.render = delayedRender;
		} else {
			module.render = render;
		}

		return module;
	};
}());
