;(function() {
	const $ = require("jquery");

	function getScript(url, callback, options) {
		options = $.extend(options || {}, {
			dataType: type,
			cache: true,
			url: url,
			success: callback
		});
		return $.ajax(options);
	}

	function getStyle(url, callback, options) {
		$("<link/>", {
		   rel: "stylesheet",
		   type: "text/css",
		   href: url
		}).appendTo("head");
		if (callback) {
			callback();
		}
	}

	module.exports = {
		getScript,
		getStyle
	};
}());
