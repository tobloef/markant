// Small module for setting whether the user has unsaved changes.
;(function() {
	const defaultMessage = "You have unsaved changes. Are you sure you want to continue?";

	let hasChanges;

	// Warn the user that they're about to lose unsaved changes.
	// Return whether they want to continue.
	function confirmContinue(message) {
		return !hasChanges || confirm(message || defaultMessage);
	}

	module.exports = {
		hasChanges,
		confirmContinue
	};
}());
