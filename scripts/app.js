;(function () {
	require("../styles/editor.css");

	const config = require("./config/app");
	const renderer = require("./renderer")(config.viewerElementId);
	const editor = require("./editor")(config.editorElementId);

	editor.codemirror.on("change", () => {
		renderer.render(editor.codemirror.getValue());
	});
}());
