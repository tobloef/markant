;(function() {
	const $ = require("jquery");

	module.exports = function(dragbarId, leftPaneId, rightPaneId, paneContainerId, leftCollapseButtonId, rightCollapseButtonId) {
		// jQuery elements
		const $paneContainer = $(`#${paneContainerId}`);
		const $dragbar = $(`#${dragbarId}`);
		const $leftPane = $(`#${leftPaneId}`);
		const $rightPane = $(`#${rightPaneId}`);
		const $leftCollapseButton = $(`#${leftCollapseButtonId}`);
		const $rightCollapseButton = $(`#${rightCollapseButtonId}`);


		// Whether the user is draggin the drag bar.
		let dragging = false;

		// Saved size of the two panes, used for restoring their size after opening a collalpsed pane.
		let oldLeftPanePercentage;
		let oldRightPanePercentage;
		// The currennt sizes of the panes in percentages.
		let leftPanePercentage;
		let rightPanePercentage;

		// Resize the two panes to percentage sizes.
		function resizePanesToPercentage(newLeftPanePercentage, newRightPanePercentage) {
			// Find the pixel width of a single percentage.
			const unit = $paneContainer.width() / (newLeftPanePercentage + newRightPanePercentage);
			$leftPane.width(unit * newLeftPanePercentage);
			$rightPane.width(unit * newRightPanePercentage);
			leftPanePercentage = newLeftPanePercentage;
			rightPanePercentage = newRightPanePercentage;
		}

		$(document).ready(function() {
			// Set the panes to their initial size.
			// Todo: Load these from previous session.
			resizePanesToPercentage(50, 50);
		});

		// On window resize, scale the sizes of the panes so they keep the same relative size.
		$(window).on("resize", function() {
			resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
		});

		$leftCollapseButton.on("click", function() {
			// If the right pane is completely closed, open the right pane, restoring it to it's former size.
			if (leftPanePercentage === 100) {
				$dragbar.show();
				$leftCollapseButton.css("left", "calc(100% - 37px)");
				resizePanesToPercentage(oldLeftPanePercentage, oldRightPanePercentage);
			// Save the panes current size and close the left pane.
			} else {
				oldLeftPanePercentage = leftPanePercentage;
				oldRightPanePercentage = rightPanePercentage;
				$rightCollapseButton.css("left", "5px");
				resizePanesToPercentage(0, 100);
			}
		});

		$rightCollapseButton.on("click", function() {
			// If the left pane is completely closed, open the left pane, restoring it to it's former size.
			if (rightPanePercentage === 100) {
				$rightCollapseButton.css("left", "initial");
				resizePanesToPercentage(oldLeftPanePercentage, oldRightPanePercentage);
			// Save the panes current size and close the right pane.
			} else {
				oldLeftPanePercentage = leftPanePercentage;
				oldRightPanePercentage = rightPanePercentage;
				$dragbar.hide();
				$leftCollapseButton.css("left", "calc(100% - 30px)");
				resizePanesToPercentage(100, 0);
			}
		});

		$dragbar.on("mousedown", function(mousedownEvent) {
			dragging = true;
			const mouseDownPos = mousedownEvent.pageX;
			const initialLeftPaneWidth = $leftPane.width();
			const initialRightPaneWidth = $rightPane.width();

			// Resize the panes based on the current mouse position relative to the initial position of the click on the drag bar.
			$(document).on("mousemove", function(mousemoveEvent) {
				if (dragging) {
					const deltaPageX = mousemoveEvent.pageX - mouseDownPos;
					const unit = 100 / $paneContainer.width();
					const newLeftPanePercentage = unit * (initialLeftPaneWidth + deltaPageX);
					const newRightPanePercentage = unit * (initialRightPaneWidth - deltaPageX);
					resizePanesToPercentage(newLeftPanePercentage, newRightPanePercentage);
				}
			});

			$(document).on("mouseup", function() {
				if (dragging) {
					dragging = false;
					$(document).unbind("mousemove");
				}
			});
		});
	};
}());
