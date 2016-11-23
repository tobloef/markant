;(function() {
	const $ = require("jquery");

	// Add some emphasis, like bold (**) or underscore (~~) to the selected text.
	// If no text is selected insert the emphasis affixes and move to cursor between them.
	function handleEmphasis(codemirror, emphasisString) {
		let newString = `${affixString}${codemirror.getSelection()}${affixString}`;
		const somethingSelected = codemirror.somethingSelected();
		codemirror.replaceSelection(newString);
		if (!somethingSelected) {
			const cursorPosition = codemirror.getCursor();
			codemirror.setCursor({
				line: cursorPosition.line,
				ch: cursorPosition.ch - affixString.length
			});
		}
	}

	module.exports = {
		handleEmphasis
	};
}());
