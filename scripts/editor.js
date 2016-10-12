;(function () {
	const $ = require("jquery");
	const CodeMirror = require("codemirror");
	require("codemirror/mode/markdown/markdown");
	require("codemirror/mode/gfm/gfm");
	require("./utils/dragbar")("dragbar", "editor", "viewer");

	const config = require("./config/editor.js");

	module.exports = function (editorElementId) {
		const module = {};

		const element = $(`#${editorElementId}`).get(0);
		if (element) {
			module.codemirror = new CodeMirror(element, config.CodeMirror);
		}

		return module;
	};
}());
