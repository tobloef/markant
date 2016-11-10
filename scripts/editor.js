;(function() {
	require("../styles/editor/editor.css");

	const config = require("./config/editor");
	const $ = require("jquery");
	const fileLoader = require("./utils/file_loader");
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

	// Todo: Load this from the user's settings
	if (config.codemirror.theme && config.themeDirectory) {
		let directory = config.themeDirectory;
		if (directory.substr(-1) !== "/") {
			directory += "/";
		}
		let path = `${directory}${config.codemirror.theme}.css`;
		try {
			fileLoader.getStyle(path);
		} catch (e) {
			console.error(`Could not load the editor theme from path ${path}.\nException: ${e}`);
		}
		if (config.useBigHeaders) {
			path = `${directory}big_headers.css`;
			try {
				fileLoader.getStyle(path);
			} catch (e) {
				console.error(`Could not load the editor theme from path ${path}.\nException: ${e}`);
			}
		}
	}

	module.exports = function() {
		const module = {};

		// Set up the CodeMirror editor.
		const editorElement = $(`#${config.editorId}`).get(0);
		if (editorElement) {
			module.codemirror = new CodeMirror(editorElement, config.codemirror);
		}

		return module;
	};
}());
