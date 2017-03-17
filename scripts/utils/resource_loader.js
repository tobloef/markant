// Logic to load scripts and styles from an url.
// Used for loading both internal and external resources.
;(function() {
	const $ = require("jquery");

	// Get a JavaScript file from an url and run it.
	function addScript(url, callback, options) {
		options = $.extend(options || {}, {
			dataType: "script",
			cache: true,
			url: url,
			success: callback,
			timeout: 10 * 1000, // 10 seconds
			error: function() {
				console.error(`Error loading script from url ${url}.`);
			}
		});
		$.ajax(options);
	}

	// Get a CSS file from an url and add the styles to the document.
	function addStyle(url, callback) {
		try {
			$("<link/>", {
				rel: "stylesheet",
				type: "text/css",
				href: url,
			}).appendTo("head");
			if (callback) {
				callback();
			}
		} catch (e) {
			console.error(`Error loading style from url ${url}.`);
			return;
		}
	}

	module.exports = {
		addScript,
		addStyle,
	};
}());
