// Module for handling errors and exceptions.
;(function() {
	const debug = true;

	// Handle some exception or error message. Will print the console to the console,
	// if debug mode is enabled. The error will also be logged to the server.
	function handle(exception) {
		// Todo: Send to server.
		if (debug) {
			console.error("Error handler cought an exception:", exception);
		}
	}

	// Set up a gloval error listener, capturing all erros on the page.
	function setUpListener() {
		window.addEventListener("error", function(e) {
			handle(e.error.toString());
		});
	}

	module.exports = {
		handle,
		setUpListener
	};
}());