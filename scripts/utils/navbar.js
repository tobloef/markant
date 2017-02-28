;(function() {
	const $ = require("jquery");
	const textInserter = require("./text_inserter");

	const idFunctionMap = {
		"file-new": fileNew,
		"file-open": fileOpen,
		"file-save": fileSave,
		"file-rename": fileRename,
		"edit-undo": editUndo,
		"edit-redo": editRedo,
		"edit-preferences": editPreferences,
		"insert-image": insertImage,
		"insert-link": insertLink,
		"insert-equation": insertEquation,
		"format-bold": formatBold,
		"format-italic": formatItalic,
		"format-strikethrough": formatStrikethrough,
		"view-editor": viewEditor,
		"view-preview": viewPreview,
	};

	let codemirror;

	function fileNew() {

	}

	function fileOpen() {

	}

	function fileSave() {

	}

	function fileRename() {

	}

	function editUndo() {
		if (codemirror == null) {
			return;
		}
		codemirror.undo();
	}

	function editRedo() {
		if (codemirror == null) {
			return;
		}
		codemirror.redo();
	}

	function editPreferences() {
		$("#settings-modal").addClass("active");
	}

	function insertLink() {
		textInserter.insertText(codemirror, "[]()", 1);
	}

	function insertImage() {
		textInserter.insertText(codemirror, "![]()", 1);
	}

	function insertEquation() {
		textInserter.insertText(codemirror, "$$$$", 2);
	}

	function formatBold() {
		textInserter.handleEmphasis(codemirror, "**");
	}

	function formatItalic() {
		textInserter.handleEmphasis(codemirror, "*");
	}

	function formatStrikethrough() {
		if (codemirror == null) {
			return;
		}
		codemirror.execCommand("newlineAndIndentContinueMarkdownList");
	}

	function viewEditor() {

	}

	function viewPreview() {

	}

	function closeDropdowns() {
		$(".navbar-dropdown .dropdown-content").hide();
	}

	module.exports = function(newCodemirror) {
		codemirror = newCodemirror;

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