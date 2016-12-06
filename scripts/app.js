;(function() {
	require("../styles/app.css");
	require("../styles/navbar.css");

	const $ = require("jquery");
	const config = require("./config/app");

	require("./utils/document_title")();

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
	const viewer = require("./viewer")(viewerElement);
	const editor = require("./editor")(editorElement);

	// Set up scroll synchronisation between the editor and the viewer.
	const scrollSync = require("./utils/scroll_sync");
	const linkedDivs = $("#viewer-container, .CodeMirror-scroll");
	scrollSync.link(linkedDivs);

	function onChangeHandler() {
		// Render the Markdown based on the text in the editor.
		const value = editor.codemirror.getValue();
		viewer.render(value, function() {
			// Sync to the linked scrollbars to match the new content.
			scrollSync.sync($(".CodeMirror-scroll"), linkedDivs, true);
		});
	}

	// When the text in the editor is changed, render the markdown.
	editor.codemirror.on("change", onChangeHandler);

	// Render any intial Markdown in the editor.
	onChangeHandler();
}());
