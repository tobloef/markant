;(function() {
	require("../styles/app.css");

	const $ = require("jquery");
	const config = require("./config/app");
	const scrollSync = require("./utils/scroll_sync");
	const fileLoader = require("./utils/file_loader");

	// Load styles
	fileLoader.getStyle("build/lib/font-awesome/css/font-awesome.min.css");

	// Set up the pane resizer.
	require("./utils/pane_resizer")(
		config.dragbarId,
		config.editorPaneId,
		config.viewerPaneId,
		config.paneContainerId,
		config.leftCollapseButtonId,
		config.rightCollapseButtonId
	);

	// Set up the editor and the viewer.
	const viewerElement = $(`#${config.viewerId}`).get(0);
	const editorElement = $(`#${config.editorId}`).get(0);
	const viewer =require("./viewer")(viewerElement);
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
