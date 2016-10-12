;(function () {
	require("../styles/editor.css");

	const viewer = require("./viewer")();
	const editor = require("./editor")();

	editor.codemirror.on("change", () => {
		viewer.render(editor.codemirror.getValue());
	});

	viewer.render(editor.codemirror.getValue());
}());
