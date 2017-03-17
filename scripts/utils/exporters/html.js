//
;(function() {
	const $ = require("jquery");

	module.exports = function(markdown) {
		const body = `<body>${$("#viewer")[0].outerHTML}</body>`;
		const head = `<head>${$("#viewer-styles")[0].outerHTML}</head>`;
		const HTML = `<html>${head}${body}</html>`;
		return HTML;
	};
}());