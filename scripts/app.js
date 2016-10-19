;(function() {
	require("../styles/app.css");

	const viewer = require("./viewer")();
	const editor = require("./editor")();

	// When the user types in the editor, render the Markdown.
	editor.codemirror.on("change", function() {
		viewer.render(editor.codemirror.getValue());
	});

	// Render any intial Markdown in the editor.
	viewer.render(editor.codemirror.getValue());
}());
