;(function() {
	require("../styles/viewer.css");

	const $ = require("jquery");
	const md = require("markdown-it")();
	const config = require("./config/viewer");

	let renderTimeout;
	let viewer;

	// Render the specified Markdown and insert the resulting HTML into the viewer.
	function render(markdown) {
		const result = md.render(markdown || "");
		viewer.innerHTML = result;
	}

	// Wait for the user to stop typing before rendering the Markdown.
	function delayedRender(markdown) {
		clearTimeout(renderTimeout);
		renderTimeout = setTimeout(function() {
			render(markdown);
		}, config.renderDelay);
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
