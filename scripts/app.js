;(function() {
	const $ = require("jquery");
	const scrollSync = require("./utils/scroll_sync");
	const fileLoader = require("./utils/file_loader");
	require("./utils/document_title")();
	require("./utils/google_analytics")();
	require("./utils/modal")();
	require("./utils/navbar")();
	require("./utils/pane_resizer")();

	// Load styles
	fileLoader.getStyle("build/lib/font-awesome/css/font-awesome.min.css");

	// Set up the editor and the viewer.
	const viewerElement = $("#viewer").get(0);
	const editorElement = $("#editor").get(0);
	const viewer = require("./viewer")(viewerElement);
	const editor = require("./editor")(editorElement);

	function onChangeHandler() {
		// Render the Markdown based on the text in the editor.
		const value = editor.codemirror.getValue();
		viewer.render(value, function() {
			// Sync to the linked scrollbars to match the new content.
			scrollSync.sync($(".CodeMirror-scroll"), linkedDivs, true);
		});
	}

	// Set up scroll synchronisation between the editor and the viewer.
	const linkedDivs = $("#viewer-container, .CodeMirror-scroll");
	scrollSync.link(linkedDivs);

	// When the text in the editor is changed, render the markdown.
	editor.codemirror.on("change", onChangeHandler);

	// Render any intial Markdown in the editor.
	onChangeHandler();
}());
