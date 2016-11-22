;(function() {
	const config = {
		// Id of the drag bar element, used for resizing the editor and viewer panes.
		dragbarId: "dragbar",
		// Id of the editor pane element.
		editorPaneId: "editor-pane",
		// Id of the CodeMirror editor.
		editorId: "editor",
		// Id of the viewer pane element.
		viewerPaneId: "viewer-pane",
		// ID of the viewer element, where the Markdown is rendered.
		viewerId: "viewer",
		// Id of the container for the editor and viewer panes.
		paneContainerId: "pane-container",
		// Id of the leftmost button to collapse the editor pane.
		leftCollapseButtonId: "left-pane-collapse-button",
		// Id of the rightmost button to collapse the viewer pane.
		rightCollapseButtonId: "right-pane-collapse-button",
	};

	module.exports = config;
}());
