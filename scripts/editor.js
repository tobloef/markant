;(function() {
	require("../styles/editor/editor.css");

	const config = require("./config/editor");
	const $ = require("jquery");
	const fileLoader = require("./utils/file_loader");
	const CodeMirror = require("codemirror");
	require("codemirror/mode/markdown/markdown");
	require("codemirror/mode/gfm/gfm");

	// Load the stylesheets for the CodeMirror editor.
	function loadEditorThemes() {
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
	}

	module.exports = function(editorElement) {
		const module = {};

		// Set up the CodeMirror editor.
		if (editorElement) {
			module.codemirror = new CodeMirror(editorElement, config.codemirror);
			loadEditorThemes();
		}

		return module;
	};
}());
