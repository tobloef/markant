;(function () {
	const CodeMirror = require("codemirror");
	require("codemirror/mode/markdown/markdown");

	module.exports = function (editorElementId) {
		const module = {};

		const element = document.getElementById(editorElementId);
		const codemirror = new CodeMirror(element);

		module.codemirror = codemirror;

		return module;
	};
}());
