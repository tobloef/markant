;(function() {
	const $ = require("jquery");
	const scrollSync = require("./utils/scroll_sync");
	const resourceLoader = require("./utils/resource_loader");
	const settingsHelper = require("./utils/settings_helper");
	const shortcuts = require("./utils/shortcuts");
	require("./utils/document_title");
	require("./utils/google_analytics");
	require("./utils/modals/modal");
	require("./utils/modals/settings_modal");

	// Load styles
	resourceLoader.getStyle("build/lib/font-awesome/css/font-awesome.min.css");

	// Set up the editor and the viewer.
	const viewerElement = $("#viewer").get(0);
	const editorElement = $("#editor").get(0);
	const viewer = require("./viewer")(viewerElement);
	const editor = require("./editor")(editorElement);

	// Set up a few more utility modules.
	require("./utils/pane_resizer")(editor.codemirror);
	require("./utils/navbar")(editor.codemirror);
	const functions = require("./utils/app_functions")(editor.codemirror);

	function onChangeHandler() {
		const value = editor.codemirror.getValue();
		// Save the markdown to localStorage.
		settingsHelper.setSetting("markdown", value);

		// Render the Markdown to the viewer.
		viewer.render(value, function() {
			// Sync to the linked scrollbars to match the new content.
			scrollSync.sync($(".CodeMirror-scroll"), linkedDivs, true);
		});
	}

	// Set up shortcut bindings
	$(document).on("keydown", shortcuts.handleKeypress);
	const bindings = {
		"ctrl+n": functions.fileNew,
		"ctrl+o": functions.fileOpen,
		"ctrl+s": functions.fileSave,
		"ctrl+k": functions.insertLink,
		"ctrl+": functions.insertEquation,
		"ctrl+b": functions.formatBold,
		"ctrl+i": functions.formatItalic
	};
	shortcuts.addBindings(bindings);

	// Set up scroll synchronisation between the editor and the viewer.
	const linkedDivs = $("#viewer-container, .CodeMirror-scroll");
	scrollSync.link(linkedDivs);

	// When the text in the editor is changed, render the markdown.
	editor.codemirror.on("change", onChangeHandler);

	const initialMarkdown = settingsHelper.getSetting("markdown");
	editor.codemirror.setValue(initialMarkdown);

	// Render any intial Markdown in the editor.
	onChangeHandler();
}());
