;(function() {
	// Add some emphasis, like bold (**) or underscore (~~) to the selected text.
	// If no text is selected insert the emphasis affixes and move to cursor between them.
	function handleEmphasis(codemirror, emphasisString) {
		if (codemirror == null) {
			return;
		}
		const newString = `${emphasisString}${codemirror.getSelection()}${emphasisString}`;
		const somethingSelected = codemirror.somethingSelected();
		codemirror.replaceSelection(newString);
		if (!somethingSelected) {
			insertText(codemirror, emphasisString, emphasisString.length);
		}
	}

	// Insert some text in the editor at the current cursor position.
	// The cursorOffset is optional and can be used to shift the cursor a number of
	// characters from the right. For example, if cursorOffset is 2 and the inserted
	// text is "Hello", the cursor will end up between the two l's, like "Hel|lo".
	function insertText(codemirror, text, cursorOffset) {
		if (codemirror == null) {
			return;
		}
		const cursorPosition = codemirror.getCursor();
		codemirror.replaceSelection(text);
		codemirror.setCursor({
			line: cursorPosition.line,
			ch: cursorPosition.ch + text.length - (cursorOffset || 0),
		});
		codemirror.focus();
	}

	module.exports = {
		handleEmphasis,
		insertText
	};
}());
