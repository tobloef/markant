;(function () {
	const config = require("./config/editor");
	const $ = require("jquery");
	const CodeMirror = require("codemirror");
	require("codemirror/mode/markdown/markdown");
	require("codemirror/mode/gfm/gfm");
	require("./utils/dragbar")(
		config.dragbarElementId,
		config.editorElementId,
		config.viewerElementId,
		config.paneContainerElementId
	);

	module.exports = function () {
		const module = {};

		const element = $(`#${config.editorElementId}`).get(0);
		if (element) {
			module.codemirror = new CodeMirror(element, config.CodeMirror);
		}

		return module;
	};
}());
