;(function() {
	const defaultMessage = "You have unsaved changes. Are you sure you want to continue?";

	let hasChanges;

	function confirmContinue(message) {
		return !hasChanges || confirm(message || defaultMessage);
	}

	module.exports = {
		hasChanges,
		confirmContinue
	};
}());
