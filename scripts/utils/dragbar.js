;(function () {
	const $ = require("jquery");

	module.exports = function (dragbarElementId, leftElementPaneId, rightElementPaneId, paneContainerElementId) {
		const $paneContainer = $(`#${paneContainerElementId}`);
		const $dragbar = $(`#${paneContainerElementId} #${dragbarElementId}`);
		const $leftPane = $(`#${paneContainerElementId} #${leftElementPaneId}`);
		const $rightPane = $(`#${paneContainerElementId} #${rightElementPaneId}`);

		let dragging = false;

		// Todo: Load these from previous session.
		let leftPanePercentage = 50;
		let rightPanePercentage = 50;

		function setInitialPaneSizes() {
			if ($leftPane && $rightPane) {
				const unit = $paneContainer.width() / (leftPanePercentage + rightPanePercentage);
				$leftPane.width(unit * leftPanePercentage);
				$rightPane.width(unit * rightPanePercentage);
			}
		}

		$(document).on("ready", setInitialPaneSizes);
		$(window).on("resize", setInitialPaneSizes);

		if ($dragbar) {
			$dragbar.on("mousedown", (mousedownEvent) => {
				mousedownEvent.preventDefault();
				dragging = true;
				let prevPageX = mousedownEvent.pageX;

				$(document).on("mousemove", (mousemoveEvent) => {
					if (dragging) {
						if ($leftPane && $rightPane) {
							const deltaPageX = mousemoveEvent.pageX - prevPageX;
							prevPageX = mousemoveEvent.pageX;
							$leftPane.width($leftPane.width() + deltaPageX);
							$rightPane.width($rightPane.width() - deltaPageX);
							leftPanePercentage = 100 / $paneContainer.width() * $leftPane.width();
							rightPanePercentage = 100 / $paneContainer.width() * $rightPane.width();
						}
					}
				});

				$(document).on("mouseup", () => {
					if (dragging) {
						dragging = false;
						$(document).unbind("mousemove");
					}
				});
			});
		}
	};
}());
