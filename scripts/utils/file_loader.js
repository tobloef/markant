;(function() {
	const $ = require("jquery");

	function getScript(url, callback, options) {
		options = $.extend(options || {}, {
			dataType: "application/javascript",
			cache: true,
			url,
			success: callback,
			fail: function() {
				console.error(`Error loading script from url ${url}.\nException: ${e}`);
			},
		});
		return $.ajax(options);
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
