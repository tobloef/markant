// Main module for the editor logic.
;(function() {
	const resourceLoader = require("./utils/resource_loader");
	const CodeMirror = require("codemirror");
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
		// Todo: Replace this with new shortcut helper.
		extraKeys: {
			"Enter": function(codemirror) {
				codemirror.execCommand("newlineAndIndentContinueMarkdownList");
			},
		},
	};

	// Directory for CodeMirror CSS styles.
	const themeDirectory = "build/lib/codemirror/theme";

	const $viewerStyles = $("#viewer-styles");

	// Load the user's preferences and apply them to the codemirror config.
	function loadUserSettings() {
		const indentSize = settingsHelper.getSetting("editorIndentSize");
		if (indentSize) {
			codemirrorConfig.indentUnit = indentSize;
			codemirrorConfig.tabSize = indentSize;
		}
		const theme = settingsHelper.getSetting("editorTheme");
		if (theme) {
			codemirrorConfig.theme = theme;
		}
		const useTabs = settingsHelper.getSetting("editorUseTabs");
		if (useTabs) {
			codemirrorConfig.indentWithTabs = useTabs;
		}
		const showLineNumbers = settingsHelper.getSetting("editorShowLineNumbers");
		if (showLineNumbers) {
			codemirrorConfig.lineNumbers = showLineNumbers;
		}
		if (codemirrorConfig.theme) {
			resourceLoader.addStyle(`${themeDirectory}/${codemirrorConfig.theme}.css`);
		}
		const useBigHeaders = settingsHelper.getSetting("editorBigHeaders");
		if (useBigHeaders && useBigHeaders) {
			resourceLoader.addStyle(`${themeDirectory}/big_headers.css`);
		}
	}

	// Load the user's preferences and apply them to the existing editor element.
	function loadStyleSettings() {
		const fontFamily = settingsHelper.getSetting("editorFontFamily");
		if (fontFamily && fontFamily in settingsHelper.fontFamilyMap) {
			$(".CodeMirror").css("font-family", `${settingsHelper.fontFamilyMap[fontFamily]}`);
		}
		const fontSize = settingsHelper.getSetting("editorFontSize");
		if (fontSize) {
			$(".CodeMirror").css("font-size", fontSize);
		}
	}

	module.exports = function(editorElement) {
		const module = {};

		// Set up the CodeMirror editor.
		if (editorElement) {
			loadUserSettings();
			module.codemirror = new CodeMirror(editorElement, codemirrorConfig);
			loadStyleSettings();
		}

		return module;
	};
}());
