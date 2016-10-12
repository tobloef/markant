;(function () {
	const config = {
		CodeMirror: {
			mode: "gfm",
			lineWrapping: true,
			lineNumbers: true,
			autofocus: true,
			viewportMargin: 10,
		},
		dragbarElementId: "dragbar",
		editorElementId: "editor",
		viewerElementId: "viewer",
		paneContainerElementId: "paneContainer",
	};

	module.exports = config;
}());
