;(function () {
	const $ = require("jquery");

	module.exports = function (dragbarId, leftPaneId, rightPaneId) {
		const $dragbar = $("#" + dragbarId);
		const $leftPane = $("#" + leftPaneId);
		const $rightPane = $("#" + rightPaneId);

		let draggin = false;

		if ($dragbar) {
			$dragbar.on("mousedown", function (event) {
				event.preventDefault();
				dragging = true;
				const downPageX = event.pageX;

				$(document).on("mousemove", function (event) {
					if (dragging) {
						if ($leftPane && $rightPane) {
							const deltaPageX = event.pageX - downPageX;
							$leftPane.css("width", "50%").css("width", `+=${deltaPageX - 10}px`);
							$rightPane.css("width", "50%").css("width", `-=${deltaPageX + 10}px`);
						}
					}
				});

				$(document).on("mouseup", function (event) {
					if (dragging) {
						dragging = false;
						$(document).unbind("mousemove");
					}
				});
			});
		}
	};
}());
