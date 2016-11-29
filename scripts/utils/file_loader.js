;(function() {
	const $ = require("jquery");

	function getScript(url, callback, options) {
		options = $.extend(options || {}, {
			dataType: "application/javascript",
			cache: true,
			url,
			success: callback,
		});
		return $.ajax(options);
	}

	function getStyle(url, callback) {
		$("<link/>", {
			rel: "stylesheet",
			type: "text/css",
			href: url,
		}).appendTo("head");
		if (callback) {
			callback();
		}
	}

	module.exports = {
		getScript,
		getStyle,
	};
}());
