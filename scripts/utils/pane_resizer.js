;(function() {
	const $ = require("jquery");
	const settingsHelper = require("./settings_helper");

	// jQuery elements
	const $paneContainer = $("#pane-container");
	const $dragbar = $("#dragbar");
	const $leftPane = $("#editor-pane");
	const $rightPane = $("#viewer-pane");
	const $leftCollapseButton = $("#left-collapse-button");
	const $rightCollapseButton = $("#right-collapse-button");
	const $viewer = $rightPane.find("#viewer");
	const $body = $("body");
	const $editorScrollbar = $leftPane.find(".CodeMirror-vscrollbar > div").eq(0);

	const minPaneWidth = 250;
	const minCollapseWidth = 75;

	module.exports = function(codemirror) {
		// Whether the user is draggin the drag bar.
		let dragging = false;
		// Whether the panes should be split the next time the space is available.
		let shouldSplitPanes = false;

		// Saved size of the two panes, used for restoring their size after opening a collalpsed pane.
		let oldLeftPanePercentage;
		let oldRightPanePercentage;
		// The currennt sizes of the panes in percentages.
		let leftPanePercentage;
		let rightPanePercentage;

		// Resize the two panes to percentage sizes.
		function resizePanesToPercentage(newLeftPanePercentage, newRightPanePercentage) {
			// Make sure the percentages add up to 100% total.
			if (Math.abs(newLeftPanePercentage + newRightPanePercentage - 100) > 0.1) {
				console.warn("Error resizing panes, percentages don't add up. Resetting to 50% split.");
				leftPanePercentage = 50;
				rightPanePercentage = 50;
				return resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
			}
			let newLeftWidth = ($paneContainer.width() / 100) * newLeftPanePercentage;
			let newRightWidth = ($paneContainer.width() / 100) * newRightPanePercentage;
			$dragbar.show();
			if (newLeftPanePercentage === 0 || newRightPanePercentage === 0) {
				if (shouldSplitPanes && $paneContainer.width() >= minPaneWidth * 2) {
					shouldSplitPanes = false;
					leftPanePercentage = oldLeftPanePercentage;
					rightPanePercentage = oldRightPanePercentage;
					return resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
				}
				if (newRightPanePercentage === 0) {
					$dragbar.hide();
				}
			} else {
				if ($paneContainer.width() < minPaneWidth * 2) {
					shouldSplitPanes = true;
					leftPanePercentage = 100;
					rightPanePercentage = 0;
					return resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
				}
				if (newLeftWidth < minCollapseWidth) {
					leftPanePercentage = 0;
					rightPanePercentage = 100;
					return resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
				}
				if (newRightWidth < minCollapseWidth) {
					leftPanePercentage = 100;
					rightPanePercentage = 0;
					return resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
				}
				if (newLeftWidth < minPaneWidth) {
					newLeftWidth = minPaneWidth;
					newRightWidth = $paneContainer.width() - newLeftWidth;
				}
				if (newRightWidth < minPaneWidth) {
					newRightWidth = minPaneWidth;
					newLeftWidth = $paneContainer.width() - newRightWidth;
				}
			}
			$leftPane.width(newLeftWidth);
			$rightPane.width(newRightWidth);
			if (codemirror != null) {
				codemirror.refresh();
			}
			setCollapseButtonPositions();
		}

		// Set the positions, specifically the horizontal positions, of the two collapse buttons.
		// This is done so they won't overlap with the scrollbars.
		function setCollapseButtonPositions() {
			const leftPaneHasScrollbar = $editorScrollbar.height() > 0;
			let rightOffset = 34;
			if (leftPanePercentage === 100) {
				rightOffset -= 5;
			}
			if (leftPaneHasScrollbar) {
				rightOffset += 13;
			}
			$leftCollapseButton.css("left", `calc(100% - ${rightOffset}px)`);
			if (leftPanePercentage === 0) {
				$rightCollapseButton.css("margin-left", "5px");
			} else {
				$rightCollapseButton.css("margin-left", "2px");
			}
		}

		$(document).ready(function() {
			// Show the collapse buttons and set the panes to their initial size.
			$leftCollapseButton.css("visibility", "visible");
			$rightCollapseButton.css("visibility", "visible");

			leftPanePercentage = parseFloat(settingsHelper.getSetting("leftPanePercentage"));
			rightPanePercentage = parseFloat(settingsHelper.getSetting("rightPanePercentage"));
			oldLeftPanePercentage = leftPanePercentage;
			oldRightPanePercentage = rightPanePercentage;
			resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
		});

		// On window resize, scale the sizes of the panes so they keep the same relative size.
		$(window).on("resize", function() {
			resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
		});

		$leftCollapseButton.on("click", function() {
			if (rightPanePercentage === 0 && $paneContainer.width() >= minPaneWidth * 2) {
				leftPanePercentage = oldLeftPanePercentage;
				rightPanePercentage = oldRightPanePercentage;
			} else {
				leftPanePercentage = 0;
				rightPanePercentage = 100;
				resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
			}
			resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
		});

		$rightCollapseButton.on("click", function() {
			if (leftPanePercentage === 0 && $paneContainer.width() >= minPaneWidth * 2) {
				leftPanePercentage = oldLeftPanePercentage;
				rightPanePercentage = oldRightPanePercentage;
			} else {
				leftPanePercentage = 100;
				rightPanePercentage = 0;
			}
			resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
		});

		$dragbar.on("mousedown", function(mousedownEvent) {
			dragging = true;
			$body.addClass("no-selection");
			const mouseDownPos = mousedownEvent.pageX;
			const initialLeftPaneWidth = $leftPane.width();
			const initialRightPaneWidth = $rightPane.width();

			// Resize the panes based on the current mouse position relative to
			// the position of the dragbar when it was clicked.
			$(document).on("mousemove", function(mousemoveEvent) {
				if (dragging) {
					const deltaPageX = mousemoveEvent.pageX - mouseDownPos;
					const unit = $paneContainer.width() / 100;
					const newLeftPanePercentage = (initialLeftPaneWidth + deltaPageX) / unit;
					const newRightPanePercentage = (initialRightPaneWidth - deltaPageX) / unit;
					leftPanePercentage = newLeftPanePercentage;
					rightPanePercentage = newRightPanePercentage;
					if (leftPanePercentage < minPaneWidth / unit) {
						leftPanePercentage = minPaneWidth / unit;
						rightPanePercentage = 100 - leftPanePercentage;
					}
					if (rightPanePercentage < minPaneWidth / unit) {
						rightPanePercentage = minPaneWidth / unit;
						leftPanePercentage = 100 - rightPanePercentage;
					}
					oldLeftPanePercentage = leftPanePercentage;
					oldRightPanePercentage = rightPanePercentage;
					settingsHelper.setSetting("leftPanePercentage", leftPanePercentage);
					settingsHelper.setSetting("rightPanePercentage", rightPanePercentage);
					resizePanesToPercentage(newLeftPanePercentage, newRightPanePercentage);
				}
			});

			$(document).on("mouseup", function() {
				if (dragging) {
					dragging = false;
					$body.removeClass("no-selection");
					$(document).unbind("mousemove");
				}
			});
		});
	};
}());
