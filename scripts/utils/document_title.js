;(function() {
	const $ = require("jquery");
	const settingsHelper = require("./settings_helper");

	// Max width for the input element.
	const maxWidth = 300;
	// The amount of extra width to add to the input element.
	const extraWidth = 3;
	// Class for the title input element.
	const inputClass = "document-title-input";
	// Class for the title mirror element.
	const mirrorClass = "document-title-mirror";

	const $input = $(`.${inputClass}`);
	const $mirror = $(`.${mirrorClass}`);

	let oldTitle;

	setup($input, $mirror);

	$input.on("focusout", function(event) {
		if ($input.val() === "") {
			$input.val(settingsHelper.getDefaultValue("documentTitle"));
		}
		oldTitle = $input.val();
		settingsHelper.setSetting("documentTitle", $input.val());
	});

	$input.on("input change load focusout", function() {
		mirrorWidth($input, $mirror);
	});

	$input.on("focus", function(event) {
		if ($input.val() === settingsHelper.getDefaultValue("documentTitle")) {
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

	function setup($input, $mirror) {
		$input.val(settingsHelper.getSetting("documentTitle"));
		if ($input.val() === "") {
			$input.val(settingsHelper.getDefaultValue("documentTitle"));
		}
		oldTitle = $input.val();
		mirrorWidth($input, $mirror);
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
		getTitle
	};
}());
