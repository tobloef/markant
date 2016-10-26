;(function() {
	const $ = require("jquery");

	function getScript(url, callback, options) {
		options = $.extend(options || {}, {
			dataType: "script",
			cache: true,
			url: url,
			success: callback
		});
		return $.ajax(options);
	}

	module.exports = {
		getScript
	};
}());
