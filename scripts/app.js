// Main module for the app. This is where everything is initialized and all other module calls stem from.
;(function() {
	const $ = require("jquery");
	const scrollSync = require("./utils/scroll_sync");
	const resourceLoader = require("./utils/resource_loader");
	const shortcuts = require("./utils/shortcuts");
	const unsavedChanges = require("./utils/unsaved_changes");
	const navbar = require("./utils/navbar");
	require("./utils/document_title");
	require("./utils/google_analytics");
	require("./utils/modals/modal");
	require("./utils/modals/settings_modal");

	// Load styles
	resourceLoader.addStyle("build/lib/font-awesome/css/font-awesome.min.css");

	// Set up the editor and the viewer.
	const viewerElement = $("#viewer").get(0);
	const editorElement = $("#editor").get(0);
	const viewer = require("./viewer")(viewerElement);
	const editor = require("./editor")(editorElement);

	// Set up a few more utility modules.
	require("./utils/pane_resizer")(editor.codemirror);
	navbar.initialize(editor.codemirror);
	const functions = require("./utils/app_functions")(editor.codemirror);

	const initialMarkdown = "";

	// Before the user closes the window, warn them if they have unsaved changes.
	$(window).on("beforeunload", function(event) {
		if (unsavedChanges.hasChanges) {
			const message = "You have unsaved changes. Are you sure you want to leave without saving?";
			if (event) {
				event.returnValue = message;
			}
			return message;
		}
		return;
	});

	// Set up shortcut bindings
	$(document).on("keydown", shortcuts.handleKeypress);
	const bindings = {
		"ctrl+n": functions.fileNew,
		"ctrl+o": functions.fileOpen,
		"ctrl+s": functions.fileSave,
		"ctrl+k": functions.insertLink,
		"ctrl+": functions.insertEquation,
		"ctrl+b": functions.formatBold,
		"ctrl+i": functions.formatItalic,
	};
	shortcuts.addBindings(bindings);

	// Set up scroll synchronisation between the editor and the viewer.
	const things = [
		{
			$master: $("#viewer-container")
		},
		{
			$master: $(".CodeMirror-scroll"),
			$extraEventTriggeres: $(".CodeMirror-vscrollbar")
		}
	];
	scrollSync.link(things);

	// When the text in the editor is changed, render the markdown.
	editor.codemirror.on("change", onChangeHandler);

	editor.codemirror.setValue(initialMarkdown);

	// Render any intial Markdown in the editor.
	onChangeHandler();

	// When the user changes the markdown in the editor.
	function onChangeHandler() {
		const value = editor.codemirror.getValue();
		unsavedChanges.hasChanges = true && (value !== initialMarkdown);
		// Render the Markdown to the viewer.
		viewer.render(value, function() {
			// Sync to the linked scrollbars to match the new content.
			scrollSync.sync($(".CodeMirror-scroll"), $(".CodeMirror-scroll"), $(".CodeMirror-scroll, #viewer-container"), true);
		});
	}
}());
