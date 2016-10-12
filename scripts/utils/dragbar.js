;(function () {
	const $ = require("jquery");

	module.exports = function (dragbarId, leftPaneId, rightPaneId) {
		const $dragbar = $(`#${dragbarId}`);
		const $leftPane = $(`#${leftPaneId}`);
		const $rightPane = $(`#${rightPaneId}`);

		let dragging = false;
		let downPageX;

		if ($dragbar) {
			$dragbar.on("mousedown", (event) => {
				event.preventDefault();
				dragging = true;
				downPageX = event.pageX;
			});

			$(document).on("mousemove", (event) => {
				if (dragging) {
					if ($leftPane && $rightPane) {
						const deltaPageX = event.pageX - downPageX;
						$leftPane.css("width", "50%").css("width", `+=${deltaPageX - 10}px`);
						$rightPane.css("width", "50%").css("width", `-=${deltaPageX + 10}px`);
					}
				}
			});

			$(document).on("mouseup", () => {
				if (dragging) {
					dragging = false;
					$(document).unbind("mousemove");
				}
			});
		}
	};
}());
