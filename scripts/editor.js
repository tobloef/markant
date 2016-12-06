;(function() {
	const fileLoader = require("./utils/file_loader");
	const CodeMirror = require("codemirror");
	const emphasis = require("./utils/markdown_emphasis");

	require("codemirror/mode/markdown/markdown");
	require("codemirror/mode/gfm/gfm");
	require("codemirror/addon/edit/continuelist");

	const codemirrorConfig = {
		mode: {
			name: "gfm",
			allowAtxHeaderWithoutSpace: true,
		},
		lineWrapping: true,
		lineNumbers: false,
		autofocus: true,
		html: true,
		value: "",
		theme: "light",
		extraKeys: {
			"Ctrl-B": function(codemirror) {
				emphasis.handleEmphasis(codemirror, "**");
			},
			"Ctrl-I": function(codemirror) {
				emphasis.handleEmphasis(codemirror, "*");
			},
			"Ctrl-U": function(codemirror) {
				emphasis.handleEmphasis(codemirror, "~~");
			},
			"Enter": function(codemirror) {
				codemirror.execCommand("newlineAndIndentContinueMarkdownList");
			},
		},
	};

	const themeDirectory = "build/lib/codemirror/theme";
	const useBigHeaders = false;

	// Load the stylesheets for the CodeMirror editor.
	function loadEditorThemes() {
		fileLoader.getStyle(`${themeDirectory}/${codemirrorConfig.theme}.css`);
		if (useBigHeaders) {
			fileLoader.getStyle(`${themeDirectory}/big_headers.css`);
		}
	}

	module.exports = function(editorElement) {
		const module = {};

		// Set up the CodeMirror editor.
		if (editorElement) {
			module.codemirror = new CodeMirror(editorElement, codemirrorConfig);
			loadEditorThemes();
		}

		return module;
	};
}());
