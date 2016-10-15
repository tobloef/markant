;(function () {
	const config = {
		CodeMirror: {
			mode: "text/plain",
			lineWrapping: true,
			lineNumbers: false,
			autofocus: true,
		},
		dragbarId: "dragbar",
		editorPaneId: "editor-pane",
		editorId: "editor",
		viewerPaneId: "viewer-pane",
		viewerId: "viewer",
		paneContainerId: "pane-container",
		leftCollapseButtonId: "left-pane-collapse-button",
		rightCollapseButtonId: "right-pane-collapse-button",
	};

	module.exports = config;
}());
