;(function() {
	const $ = require("jquery");

	module.exports = function() {
		const $tabs = $(".modal-tabs > li");
		const $contents = $(".tab-content");
		const $close = $(".close-button");

		$close.on("click", function() {
			$(this).closest(".modal").removeClass("active");
		});

		$tabs.on("click", function() {
			$contents.removeClass("active");
			$(`#${$(this).data("tab")}`).addClass("active");
			$tabs.removeClass("active");
			$(this).addClass("active");
		});
	};
}());