;(function() {
	const $ = require("jquery");

	function closeDropdowns() {
		$(".navbar-dropdown .dropdown-content").hide();
	}

	module.exports = function(codemirror) {
		const functions = require("./app_functions")(codemirror);

		const idFunctionMap = {
			"file-new": functions.fileNew,
			"file-open": functions.fileOpen,
			"file-save": functions.fileSave,
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

		$links.on("click", function(event) {
			const id = $(this).attr("id");
			if (id in idFunctionMap) {
				idFunctionMap[id]($(this));
				closeDropdowns();
				event.preventDefault();
			}
		});

		$(document).click(function(event) {
			closeDropdowns();
			const $navbarDropdown = $(event.target).parent(".navbar-dropdown");
			if ($navbarDropdown.length !== 0) {
				$navbarDropdown.find(".dropdown-content").show();
			}
		});
	};
}());