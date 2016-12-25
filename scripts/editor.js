;(function() {
	const fileLoader = require("./utils/file_loader");
	const CodeMirror = require("codemirror");
	const emphasis = require("./utils/markdown_emphasis");
	const settingsHelper = require("./utils/settings_helper");
	const $ = require("jquery");

	require("codemirror/mode/markdown/markdown");
	require("codemirror/mode/gfm/gfm");
	require("codemirror/addon/edit/continuelist");

	const codemirrorConfig = {
		mode: {
			name: "gfm",
			allowAtxHeaderWithoutSpace: true,
		},
		lineWrapping: true,
		autofocus: true,
		html: true,
		value: "",
		lineNumbers: false,
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

	// Used for converting settings values to actual font-familys.
	const fontFamilyMap = {
		"monospace": "monospace",
		"sans-serif": "sans-serif",
		"serif": "serif",
	};

	// Load the user's preferences and apply them to the codemirror config.
	function loadConfigSettings() {
		const indentSize = settingsHelper.getSetting("editorIndentSize");
		if (indentSize != null) {
			codemirrorConfig.indentUnit = indentSize;
			codemirrorConfig.tabSize = indentSize;
		}
		const theme = settingsHelper.getSetting("editorTheme");
		if (theme != null) {
			codemirrorConfig.theme = theme;
		}
		const useTabs = settingsHelper.getSetting("editorUseTabs");
		if (useTabs != null) {
			codemirrorConfig.indentWithTabs = useTabs;
		}
		const showLineNumbers = settingsHelper.getSetting("editorShowLineNumbers");
		if (showLineNumbers != null) {
			codemirrorConfig.lineNumbers = false;
		}
		if (codemirrorConfig.theme != null) {
			fileLoader.getStyle(`${themeDirectory}/${codemirrorConfig.theme}.css`);
		}
		const useBigHeaders = settingsHelper.getSetting("editorUseBigHeaders");
		if (useBigHeaders != null && useBigHeaders) {
			fileLoader.getStyle(`${themeDirectory}/big_headers.css`);
		}
	}

	// Load the user's preferences and apply them to the existing editor object.
	function loadStyleSettings() {
		const fontFamily = settingsHelper.getSetting("editorFontFamily");
		if (fontFamily != null && fontFamily in fontFamilyMap) {
			$(".CodeMirror").css("font-family", `'${fontFamilyMap[fontFamily]}'`);
		}
		const fontSize = settingsHelper.getSetting("editorFontSize");
		if (fontSize != null) {
			$(".CodeMirror").css("font-size", fontSize);
		}
	}

	module.exports = function(editorElement) {
		const module = {};

		// Set up the CodeMirror editor.
		if (editorElement) {
			loadConfigSettings();
			module.codemirror = new CodeMirror(editorElement, codemirrorConfig);
			loadStyleSettings();
		}

		return module;
	};
}());
