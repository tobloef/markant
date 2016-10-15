;(function() {
	require("../styles/editor.css");

	const viewer = require("./viewer")();
	const editor = require("./editor")();

	editor.codemirror.on("change", function() {
		viewer.render(editor.codemirror.getValue());
	});

	viewer.render(editor.codemirror.getValue());
}());
