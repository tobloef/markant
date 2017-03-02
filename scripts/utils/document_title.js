;(function() {
	const $ = require("jquery");
	const unsavedChanges = require("./unsaved_changes");

	// Max width for the input element.
	const maxWidth = 300;
	// The amount of extra width to add to the input element.
	const extraWidth = 3;
	// Class for the title input element.
	const inputClass = "document-title-input";
	// Class for the title mirror element.
	const mirrorClass = "document-title-mirror";
	// The default title
	const defaultTitle = "Untitled document";

	const $input = $(`.${inputClass}`);
	const $mirror = $(`.${mirrorClass}`);

	let oldTitle;

	setTitle(defaultTitle);

	$input.on("focusout", function(event) {
		setTitle($input.val());
	});

	$input.on("input change load focusout", function() {
		mirrorWidth($input, $mirror);
	});

	$input.on("focus", function(event) {
		if ($input.val() === defaultTitle) {
			$input.select();
		}
	});

	$input.on("keydown", function(key) {
		if (key.keyCode === 13) {
			$input.blur();
		} else if (key.keyCode === 27) {
			$input.val(oldTitle);
			$input.blur();
		}
	});

	function getTitle() {
		$input.blur();
		return $input.val();
	}

	function setTitle(title) {
		if (title === null || title === "") {
			title = defaultTitle;
		}
		$input.val(title);
		oldTitle = title;
		mirrorWidth($input, $mirror);
		unsavedChanges.hasChanges = true;
	}

	function focus() {
		$input.focus();
	}

	function mirrorWidth($input, $mirror) {
		$mirror.text($input.val());
		let width = parseInt($mirror.css("width"));
		if (!isNaN(width)) {
			width += extraWidth;
			width = Math.min(maxWidth, width);
			$input.css("width", width + "px");
		}
	}

	module.exports = {
		getTitle,
		setTitle,
		focus
	};
}());
