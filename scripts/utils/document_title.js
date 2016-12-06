;(function() {
	const $ = require("jquery");

	// The default title for unnamed documents.
	const defaultTitle = "Untitled document";
	// Max width for the input element.
	const maxWidth = 300;
	// The amount of extra width to add to the input element.
	const extraWidth = 3;
	// Class for the title input element.
	const inputClass = "document-title-input";
	// Class for the title mirror element.
	const mirrorClass = "document-title-mirror";

	module.exports = function() {
		const $input = $(`.${inputClass}`);
		const $mirror = $(`.${mirrorClass}`);

		let oldTitle;

		setup($input, $mirror);

		$input.on("input change load focusout", function() {
			mirrorWidth($input, $mirror);
		});

		$input.on("focusout", function(event) {
			if ($input.val() === "") {
				$input.val(defaultTitle);
			}
			oldTitle = $input.val();
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
	};

	function setup($input, $mirror) {
		if ($input.val() === "") {
				$input.val(defaultTitle);
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
}());
