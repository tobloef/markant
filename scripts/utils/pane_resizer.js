// Handler for resizing the two panes. It handles the logic of the dragable bar in
// the middle and the buttons to open collapsed panes.
;(function() {
	const $ = require("jquery");
	const navbar = require("./navbar");

	// Set up the jQuery elements
	const $paneContainer = $("#pane-container");
	const $dragbar = $("#dragbar");
	const $editorPane = $("#editor-pane");
	const $viewerPane = $("#viewer-pane");
	const $editorCollapseButton = $("#editor-collapse-button");
	const $viewerCollapseButton = $("#viewer-collapse-button");
	const $viewer = $viewerPane.find("#viewer");
	const $body = $("body");
	const $editorScrollbar = $editorPane.find(".CodeMirror-vscrollbar > div").eq(0);

	// Minimum width for the panes
	const minPaneWidth = 250;
	// When the user attempts to resize the pane below this width,
	// completely hide the pane. This is used for the dragbar.
	const minCollapseWidth = 100;

	let codemirror;
	// Whether the user is draggin the drag bar.
	let dragging = false;
	// Whether the panes should be split the next time the space is available.
	let shouldSplitPanes = false;

	// Saved size of the two panes, used for restoring their size after opening a collalpsed pane.
	let oldEditorPanePercentage;
	let oldViewerPanePercentage;
	// The currennt sizes of the panes in percentages.
	let editorPanePercentage = 50;
	let viewerPanePercentage = 50;

	// Set the initial state of the various elements.
	$(document).ready(function() {
		// Show the collapse buttons and set the panes to their initial size.
		$editorCollapseButton.css("visibility", "visible");
		$viewerCollapseButton.css("visibility", "visible");

		oldEditorPanePercentage = editorPanePercentage;
		oldViewerPanePercentage = viewerPanePercentage;
		resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
	});

	// On window resize, scale the sizes of the panes so they keep the same relative size.
	$(window).on("resize", function() {
		resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
	});

	// When the buttons to open a collapsed pane is pressed,
	// open the appropriate pane.
	$editorCollapseButton.on("click touchstart", toggleViewer);
	$viewerCollapseButton.on("click touchstart", toggleEditor);

	$dragbar.on("mousedown", function(mousedownEvent) {
		dragging = true;
		$body.addClass("no-selection");
		const mouseDownPos = mousedownEvent.pageX;
		const initialLeftPaneWidth = $editorPane.width();
		const initialRightPaneWidth = $viewerPane.width();

		// Resize the panes based on the current mouse position relative to
		// the position of the dragbar when it was clicked.
		$(document).on("mousemove", function(mousemoveEvent) {
			if (dragging) {
				const deltaPageX = mousemoveEvent.pageX - mouseDownPos;
				const unit = $paneContainer.width() / 100;
				const newEditorPanePercentage = (initialLeftPaneWidth + deltaPageX) / unit;
				const newViewerPanePercentage = (initialRightPaneWidth - deltaPageX) / unit;
				editorPanePercentage = newEditorPanePercentage;
				viewerPanePercentage = newViewerPanePercentage;
				if (editorPanePercentage < minPaneWidth / unit) {
					editorPanePercentage = minPaneWidth / unit;
					viewerPanePercentage = 100 - editorPanePercentage;
				}
				if (viewerPanePercentage < minPaneWidth / unit) {
					viewerPanePercentage = minPaneWidth / unit;
					editorPanePercentage = 100 - viewerPanePercentage;
				}
				oldEditorPanePercentage = editorPanePercentage;
				oldViewerPanePercentage = viewerPanePercentage;
				resizePanesToPercentage(newEditorPanePercentage, newViewerPanePercentage);
			}
		});

		$(document).on("mouseup", function() {
			if (dragging) {
				dragging = false;
				$body.removeClass("no-selection");
				$(document).unbind("mousemove");
				setNavbarIconVisibility();
			}
		});
	});

	// Set the icon of "Display Editor" and "Display Preview" navbar items.
	function setNavbarIconVisibility() {
		navbar.setVisibilityIcon("view-editor", editorPanePercentage !== 0);
		navbar.setVisibilityIcon("view-preview", viewerPanePercentage !== 0);
	}

	// Resize the two panes to percentage sizes.
	function resizePanesToPercentage(newEditorPanePercentage, newViewerPanePercentage) {
		// Make sure the percentages add up to 100% total.
		if (Math.abs(newEditorPanePercentage + newViewerPanePercentage - 100) > 0.1) {
			console.warn("Error resizing panes, percentages don't add up. Resetting to 50% split.");
			editorPanePercentage = 50;
			viewerPanePercentage = 50;
			return resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
		}
		let newLeftWidth = ($paneContainer.width() / 100) * newEditorPanePercentage;
		let newRightWidth = ($paneContainer.width() / 100) * newViewerPanePercentage;
		$dragbar.show();
		if (newEditorPanePercentage === 0 || newViewerPanePercentage === 0) {
			if (shouldSplitPanes && $paneContainer.width() >= minPaneWidth * 2) {
				shouldSplitPanes = false;
				editorPanePercentage = oldEditorPanePercentage;
				viewerPanePercentage = oldViewerPanePercentage;
				return resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
			}
			if (newEditorPanePercentage === 0) {
				$dragbar.hide();
			}
		} else {
			if ($paneContainer.width() < minPaneWidth * 2) {
				shouldSplitPanes = true;
				editorPanePercentage = 100;
				viewerPanePercentage = 0;
				return resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
			}
			if (newLeftWidth < minCollapseWidth) {
				editorPanePercentage = 0;
				viewerPanePercentage = 100;
				return resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
			}
			if (newRightWidth < minCollapseWidth) {
				editorPanePercentage = 100;
				viewerPanePercentage = 0;
				return resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
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
		$editorPane.width(newLeftWidth);
		$viewerPane.width(newRightWidth);
		if (codemirror) {
			codemirror.refresh();
		}

		setCollapseButtonPositions();
	}

	// Set the positions, specifically the horizontal positions, of the two collapse buttons.
	// This is done so they won't overlap with the scrollbars.
	function setCollapseButtonPositions() {
		if ($editorPane.width() === 0) {
			$viewerCollapseButton.show();
		} else {
			$viewerCollapseButton.hide();
		}
		if ($viewerPane.width() === 0) {
			$editorCollapseButton.show();
		} else {
			$editorCollapseButton.hide();
		}
		const leftPaneHasScrollbar = $editorScrollbar.height() > 0;
		const rightOffset = 29;
		$editorCollapseButton.css("left", `calc(100% - ${rightOffset}px)`);
		if (editorPanePercentage === 0) {
			$viewerCollapseButton.css("margin-left", "5px");
		} else {
			$viewerCollapseButton.css("margin-left", "10px");
		}
	}

	// Toggle the visibility of the editor pane
	function toggleEditor() {
		if (editorPanePercentage === 0) {
			if ($paneContainer.width() >= minPaneWidth * 2) {
				editorPanePercentage = oldEditorPanePercentage;
				viewerPanePercentage = oldViewerPanePercentage;
			} else {
				editorPanePercentage = 100;
				viewerPanePercentage = 0;
			}
		} else {
			editorPanePercentage = 0;
			viewerPanePercentage = 100;
		}
		resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
		setNavbarIconVisibility();
	}

	// Toggle the visibility of the viewer pane
	function toggleViewer() {
		if (viewerPanePercentage === 0) {
			if ($paneContainer.width() >= minPaneWidth * 2) {
				editorPanePercentage = oldEditorPanePercentage;
				viewerPanePercentage = oldViewerPanePercentage;
			} else {
				editorPanePercentage = 0;
				viewerPanePercentage = 100;
			}
		} else {
			editorPanePercentage = 100;
			viewerPanePercentage = 0;
		}
		resizePanesToPercentage(editorPanePercentage, viewerPanePercentage);
		setNavbarIconVisibility();
	}

	module.exports = function(newCodemirror) {
		if (codemirror) {
			codemirror = newCodemirror;
		}
		return {
			toggleViewer,
			toggleEditor,
		};
	};
}());
