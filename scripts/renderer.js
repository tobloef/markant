;(function(viewerElementId){
	"use strict";

	var md = require('markdown-it')();
	var config = require("./config/renderer");

	var renderTimeout;
	var viewer;

	module.exports = function(viewerElementId) {
		var module = {};

		viewer = document.getElementById(viewerElementId);

		if (config.useDelayedRendering) {
			module.render = delayedRender;
		} else {
			module.render = render;
		}

		return module;
	};

	function delayedRender(markdown) {
		clearTimeout(renderTimeout);
		renderTimeout = setTimeout(function() {
			render(markdown);
		}, config.renderDelay);
	}

	function render(markdown) {
		if (markdown === undefined) {
			markdown = "";
		}
		var result = md.render(markdown);
		viewer.innerHTML = result;
	}
})();