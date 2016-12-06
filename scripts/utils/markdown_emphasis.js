;(function() {
	// Add some emphasis, like bold (**) or underscore (~~) to the selected text.
	// If no text is selected insert the emphasis affixes and move to cursor between them.
	function handleEmphasis(codemirror, emphasisString) {
		const newString = `${emphasisString}${codemirror.getSelection()}${emphasisString}`;
		const somethingSelected = codemirror.somethingSelected();
		codemirror.replaceSelection(newString);
		if (!somethingSelected) {
			const cursorPosition = codemirror.getCursor();
			codemirror.setCursor({
				line: cursorPosition.line,
				ch: cursorPosition.ch - emphasisString.length,
			});
		}
	}

	module.exports = {
		handleEmphasis,
	};
}());
