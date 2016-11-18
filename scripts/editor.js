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

	// Fix the styling of Setext-style headers (with underlining = or - symbols).
	// Adapted from https://github.com/codemirror/CodeMirror/issues/2143#issuecomment-140100969;
	function updateSectionHeaderStyles(codemirror, change) {
		const lineCount = codemirror.lineCount();
		const startLine = Math.max(0, change.from.line - 1);
		const endLine = Math.min(change.to.line + 1, lineCount - 1);
		for (let i = startLine; i <= endLine; i++) {
			const line = codemirror.getLineHandle(i);
			const lineTokens = codemirror.getLineTokens(i);
			let token = lineTokens[0];
			// First token could be a space, try the next token.
			if (!token || !token.type || token.type.indexOf("header") === -1) {
				token = lineTokens[1];
			}
			// Not ATX style header.
			if (token && token.type && token.type.indexOf("header") !== -1 && token.string !== "#") {
				codemirror.removeLineClass(line, "text", "cm-header");
				codemirror.removeLineClass(line, "text", "cm-header-1");
				codemirror.removeLineClass(line, "text", "cm-header-2");
				const classes = token.type
					.split(" ")
					.filter(function (cls) { return cls.indexOf("header") === 0; })
					.map(function (cls) { return "cm-" + cls; })
					.join(" ");
				const previousLine = codemirror.getLineHandle(i - 1);
				codemirror.addLineClass(previousLine, "text", classes);
			}
		}
	}

	function fixSetextHeaderStyle() {

	}

	module.exports = function() {
		const module = {};

		// Set up the CodeMirror editor.
		const editorElement = $(`#${config.editorId}`).get(0);
		if (editorElement) {
			module.codemirror = new CodeMirror(editorElement, config.codemirror);
			module.codemirror.on("change", updateSectionHeaderStyles);
			updateSectionHeaderStyles(module.codemirror, {
				from: {
					line: 0
				},
				to: {
					line: module.codemirror.lineCount()
				}
			});
			loadEditorThemes();
		}

		return module;
	};
}());
