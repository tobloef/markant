// Logic for the general modal UI.
;(function() {
	const $ = require("jquery");

	// Setup jQuery element.
	const $tabs = $(".modal-tabs > li");
	const $contents = $(".tab-content");
	const $close = $(".close-modal");

	// Close the modal
	$close.on("click", function() {
		$(this).closest(".modal").removeClass("active");
	});

	// Switch to the clicked tab
	$tabs.on("click", function() {
		$contents.removeClass("active");
		$(`#${$(this).data("tab")}`).addClass("active");
		$tabs.removeClass("active");
		$(this).addClass("active");
	});
}());
