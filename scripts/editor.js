;(function () {
	const config = require("./config/editor");
	const $ = require("jquery");
	const CodeMirror = require("codemirror");
	require("codemirror/mode/markdown/markdown");
	require("codemirror/mode/gfm/gfm");
	require("./utils/pane_resizer")(
		config.dragbarId,
		config.editorPaneId,
		config.viewerPaneId,
		config.paneContainerId,
		config.leftCollapseButtonId,
		config.rightCollapseButtonId
	);

	module.exports = function () {
		const module = {};

		const editorElement = $(`#${config.editorId}`).get(0);
		if (editorElement) {
			module.codemirror = new CodeMirror(editorElement, config.CodeMirror);
		}

		return module;
	};
}());
