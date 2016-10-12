;(function () {
	const $ = require("jquery");
	const md = require("markdown-it")();
	const config = require("./config/renderer");

	let renderTimeout;
	let viewer;

	function render(markdown) {
		const result = md.render(markdown || "");
		viewer.innerHTML = result;
	}

	function delayedRender(markdown) {
		clearTimeout(renderTimeout);
		renderTimeout = setTimeout(() => {
			render(markdown);
		}, config.renderDelay);
	}

	module.exports = function (viewerElementId) {
		const module = {};

		viewer = $(`#${viewerElementId}`).get(0);

		if (config.useDelayedRendering) {
			module.render = delayedRender;
		} else {
			module.render = render;
		}

		return module;
	};
}());
