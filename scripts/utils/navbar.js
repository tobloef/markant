// Logic for the top navigation bar (navbar) in the app.
;(function() {
	const $ = require("jquery");

	// Close all open dropdowns from the navbar.
	function closeDropdowns() {
		$(".navbar-dropdown .dropdown-content").hide();
	}

	// Set the state of the visibility icon of a dropdown item,
	// signaling whether something is displayed or not.
	function setVisibilityIcon(buttonId, visibility) {
		$(`#${buttonId} > i`).removeClass("fa-eye fa-eye-slash");
		if (visibility) {
			$(`#${buttonId} > i`).addClass("fa-eye");
		} else {
			$(`#${buttonId} > i`).addClass("fa-eye-slash");
		}
	}

	// Initialize the event listeners for the dropdown items.
	function initialize(codemirror) {
		const functions = require("./app_functions")(codemirror);

		// A map of dropdown item ids and functions to call when the item is clicked.
		const idFunctionMap = {
			"file-new": functions.fileNew,
			"file-open": functions.fileOpen,
			"file-save": functions.fileSave,
			"file-export-html": functions.fileExportHtml,
			"file-rename": functions.fileRename,
			"edit-undo": functions.editUndo,
			"edit-redo": functions.editRedo,
			"edit-preferences": functions.editPreferences,
			"insert-image": functions.insertImage,
			"insert-link": functions.insertLink,
			"insert-equation": functions.insertEquation,
			"format-bold": functions.formatBold,
			"format-italic": functions.formatItalic,
			"format-strikethrough": functions.formatStrikethrough,
			"view-editor": functions.viewEditor,
			"view-preview": functions.viewPreview,
		};

		const $links = $(".navbar a");

		// When the dropdown item is clicked, call the appropriate function.
		$links.on("click touchstart", function(event) {
			if ($(this).attr("href") === "#") {
				event.preventDefault();
			}
			const id = $(this).attr("id");
			if (id in idFunctionMap) {
				idFunctionMap[id]($(this));
				closeDropdowns();
			}
		});

		// Close all open dropdowns if the user clicks anywhere but the dropdown.
		$(document).on("click touchstart", function(event) {
			closeDropdowns();
			const $navbarDropdown = $(event.target).parent(".navbar-dropdown");
			if ($navbarDropdown.length !== 0) {
				$navbarDropdown.find(".dropdown-content").show();
			}
		});
	}

	module.exports = {
		initialize,
		setVisibilityIcon,
	};
}());
