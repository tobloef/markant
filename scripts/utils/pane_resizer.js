;(function () {
	const $ = require("jquery");

	module.exports = function (dragbarId, leftPaneId, rightPaneId, paneContainerId, leftCollapseButtonId, rightCollapseButtonId) {
		const $paneContainer = $(`#${paneContainerId}`);
		const $dragbar = $(`#${dragbarId}`);
		const $leftPane = $(`#${leftPaneId}`);
		const $rightPane = $(`#${rightPaneId}`);
		const $leftCollapseButton = $(`#${leftCollapseButtonId}`);
		const $rightCollapseButton = $(`#${rightCollapseButtonId}`);


		let dragging = false;

		let oldLeftPanePercentage;
		let oldRightPanePercentage;
		let leftPanePercentage;
		let rightPanePercentage;

		function resizePanesToPercentage(newLeftPanePercentage, newRightPanePercentage) {
			leftPanePercentage = newLeftPanePercentage;
			rightPanePercentage = newRightPanePercentage;
			if ($leftPane && $rightPane) {
				const unit = $paneContainer.width() / (newLeftPanePercentage + newRightPanePercentage);
				$leftPane.width(unit * newLeftPanePercentage);
				$rightPane.width(unit * newRightPanePercentage);
			}
		}

		$(document).ready(function () {
			// Todo: Load these from previous session.
			resizePanesToPercentage(50, 50);
		});

		$(window).on("resize", function () {
			resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
		});

		$leftCollapseButton.on("click", function () {
			if (leftPanePercentage === 100) {
				$dragbar.show();
				$leftCollapseButton.css("left", "calc(100% - 37px)");
				resizePanesToPercentage(oldLeftPanePercentage, oldRightPanePercentage);
			} else {
				oldLeftPanePercentage = leftPanePercentage;
				oldRightPanePercentage = rightPanePercentage;
				$rightCollapseButton.css("left", "5px");
				resizePanesToPercentage(0, 100);
			}
		});

		$rightCollapseButton.on("click", function () {
			if (rightPanePercentage === 100) {
				$rightCollapseButton.css("left", "initial");
				resizePanesToPercentage(oldLeftPanePercentage, oldRightPanePercentage);
			} else {
				oldLeftPanePercentage = leftPanePercentage;
				oldRightPanePercentage = rightPanePercentage;
				$dragbar.hide();
				$leftCollapseButton.css("left", "calc(100% - 30px)");
				resizePanesToPercentage(100, 0);
			}
		});

		$dragbar.on("mousedown", function (mousedownEvent) {
			dragging = true;
			const mouseDownPos = mousedownEvent.pageX;
			const initialLeftPaneWidth = $leftPane.width();
			const initialRightPaneWidth = $rightPane.width();

			$(document).on("mousemove", function (mousemoveEvent) {
				if (dragging) {
					if ($leftPane && $rightPane) {
						const deltaPageX = mousemoveEvent.pageX - mouseDownPos;
						const unit = 100 / $paneContainer.width();
						const newLeftPanePercentage = unit * (initialLeftPaneWidth + deltaPageX);
						const newRightPanePercentage = unit * (initialRightPaneWidth - deltaPageX);
						resizePanesToPercentage(newLeftPanePercentage, newRightPanePercentage);
					}
				}
			});

			$(document).on("mouseup", function () {
				if (dragging) {
					dragging = false;
					$(document).unbind("mousemove");
				}
			});
		});
	};
}());
