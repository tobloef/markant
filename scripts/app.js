;(function() {
	require("../styles/app.css");

	const viewer = require("./viewer")();
	const editor = require("./editor")();

	// Render the Markdown based on the text in the editor
	function onChangeHandler() {
		viewer.render(editor.codemirror.getValue());
	}

	editor.codemirror.on("change", onChangeHandler);

	// Render any intial Markdown in the editor.
	onChangeHandler();
}());
