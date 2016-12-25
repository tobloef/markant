;(function() {
	const $ = require("jquery");

	// jQuery elements
	const $paneContainer = $("#pane-container");
	const $dragbar = $("#dragbar");
	const $leftPane = $("#editor-pane");
	const $rightPane = $("#viewer-pane");
	const $leftCollapseButton = $("#left-collapse-button");
	const $rightCollapseButton = $("#right-collapse-button");
	const $viewer = $rightPane.find("#viewer");
	const $editorScrollbar = $leftPane.find(".CodeMirror-vscrollbar > div").eq(0);

	module.exports = function(codemirror) {
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
			const unit = $paneContainer.width() / ((newLeftPanePercentage) + (newRightPanePercentage));
			// Set the panes to the new widths.
			leftPanePercentage = newLeftPanePercentage;
			rightPanePercentage = newRightPanePercentage;
			$leftPane.width(unit * newLeftPanePercentage);
			$rightPane.width(unit * newRightPanePercentage);
			localStorage.setItem("leftPanePercentage", leftPanePercentage);
			localStorage.setItem("rightPanePercentage", rightPanePercentage);
			if (codemirror !== null) {
				codemirror.refresh();
			}
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
				$rightCollapseButton.css("margin-left", "0");
			}
		}

		$(document).ready(function() {
			// Show the collapse buttons and set the panes to their initial size.
			$leftCollapseButton.css("visibility", "visible");
			$rightCollapseButton.css("visibility", "visible");

			const newLeftPercentage = parseFloat(localStorage.getItem("leftPanePercentage"));
			const newRightPercentage = parseFloat(localStorage.getItem("rightPanePercentage"));
			resizePanesToPercentage(newLeftPercentage, newRightPercentage);
			setCollapseButtonPositions();
		});

		// When the HTML of the viewer changes
		$viewer.bind("DOMSubtreeModified", function() {
			setCollapseButtonPositions();
		});


		// On window resize, scale the sizes of the panes so they keep the same relative size.
		$(window).on("resize", function() {
			resizePanesToPercentage(leftPanePercentage, rightPanePercentage);
		});

		$leftCollapseButton.on("click", function() {
			// If the right pane is completely closed, open it, restoring it to it's former size.
			if (leftPanePercentage === 100) {
				$dragbar.show();
				resizePanesToPercentage(oldLeftPanePercentage, oldRightPanePercentage);
			} else {
				// Save the panes current size and close the left pane.
				oldLeftPanePercentage = leftPanePercentage;
				oldRightPanePercentage = rightPanePercentage;
				resizePanesToPercentage(0, 100);
			}
			setCollapseButtonPositions();
		});

		$rightCollapseButton.on("click", function() {
			// If the left pane is completely closed, open it pane, restoring it to it's former size.
			if (rightPanePercentage === 100) {
				resizePanesToPercentage(oldLeftPanePercentage, oldRightPanePercentage);
			} else {
				// Save the panes current size and close the right pane.
				oldLeftPanePercentage = leftPanePercentage;
				oldRightPanePercentage = rightPanePercentage;
				$dragbar.hide();
				resizePanesToPercentage(100, 0);
			}
			setCollapseButtonPositions();
		});

		$dragbar.on("mousedown", function(mousedownEvent) {
			dragging = true;
			const mouseDownPos = mousedownEvent.pageX;
			const initialLeftPaneWidth = $leftPane.width();
			const initialRightPaneWidth = $rightPane.width();

			// Resize the panes based on the current mouse position relative to
			// the position of the dragbar when it was clicked.
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
