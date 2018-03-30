// Main module for the app. This is where everything is initialized and all other module calls stem from.
;(function() {
	// Import the error handler module and set up the global error event listener.
	// This is done before anything else to make sure all errors are captured.
	const errorHandler = require("./utils/error_handler");
	errorHandler.setUpListener();

	// Import other modules
	const $ = require("jquery");
	const scrollSync = require("./utils/scroll_sync");
	const resourceLoader = require("./utils/resource_loader");
	const shortcuts = require("./utils/shortcuts");
	const unsavedChanges = require("./utils/unsaved_changes");
	const navbar = require("./utils/navbar");
	const settings = require("./utils/settings_helper");
	require("./utils/document_title");
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

	// Before the user closes the window, warn them if they have unsaved changes.
	$(window).on("beforeunload", function(event) {
		console.log(unsavedChanges.getHasChanges());
		if (unsavedChanges.getHasChanges()) {
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
		"Ctrl+N": functions.fileNew,
		"Ctrl+O": functions.fileOpen,
		"Ctrl+S": functions.fileSave,
		"Ctrl+K": functions.insertLink,
		"Ctrl+E": functions.insertEquation,
		"Ctrl+B": functions.formatBold,
		"Ctrl+I": functions.formatItalic,
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

	// Set the editor's contents to the previous unsaved markdown document.
	// If no markdown document is found, set the contents to the default value, empty.
	editor.codemirror.setValue(settings.getSetting("documentContent"));

	// Render any intial Markdown in the editor.
	onChangeHandler();

	// When the user changes the markdown in the editor.
	function onChangeHandler() {
		const value = editor.codemirror.getValue();
		unsavedChanges.setHasChanges(value !== settings.getDefaultValue("documentContent"));
		// Render the Markdown to the viewer.
		viewer.render(value, function() {
			// Sync to the linked scrollbars to match the new content.
			scrollSync.sync($(".CodeMirror-scroll"), $(".CodeMirror-scroll"), $(".CodeMirror-scroll, #viewer-container"), true);
		});
		settings.setSetting("documentContent", value);
	}
}());
