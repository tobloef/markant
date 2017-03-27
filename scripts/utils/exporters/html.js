// Markdown to HTML exporter
// Todo: Currently not enabled, as various functions such as Math isn't working.
;(function() {
	const $ = require("jquery");
	const errorHandler = require("../error_handler");

	// The module exports the a function which takes a Markdown string and
	// returns the corresponding HTML. This is done by taking the HTML content
	// from the document preview.
	module.exports = function(markdown) {
		try {
			const body = `<body>${$("#viewer")[0].outerHTML}</body>`;
			const head = `<head>${$("#viewer-styles")[0].outerHTML}</head>`;
			const HTML = `<html>${head}${body}</html>`;
			return HTML;
		} catch(exception) {
			errorHandler.handle(exception);
			alert("An error occoured while exporting the Markdown document.");
		}
	};
}());