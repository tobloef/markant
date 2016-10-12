;(function () {
	const CodeMirror = require("codemirror");
	require("codemirror/mode/markdown/markdown");
	require("codemirror/mode/gfm/gfm");

	require("./utils/dragbar")("dragbar", "editor", "viewer");

	const config = require("./config/editor.js");

	module.exports = function (editorElementId) {
		const module = {};

		const element = document.getElementById(editorElementId);
		const codemirror = new CodeMirror(element, config.CodeMirror);

		module.codemirror = codemirror;

		return module;
	};
}());
