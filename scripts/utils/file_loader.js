;(function() {
	const $ = require("jquery");

	function getScript(url, callback, options) {
		options = $.extend(options || {}, {
			dataType: "script",
			cache: true,
			url: url,
			success: callback,
			timeout: 10 * 1000, // 10 seconds
			error: function() {
				console.error(`Error loading script from url ${url}.\nException: ${e}`);
			}
		});
		$.ajax(options);
	}

	function getStyle(url, callback) {
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
			console.error(`Error loading style from url ${url}.\nException: ${e}`);
			return;
		}
	}

	module.exports = {
		getScript,
		getStyle,
	};
}());
