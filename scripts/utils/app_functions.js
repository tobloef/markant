;(function() {
	module.exports = function(codemirror) {
		const $ = require("jquery");
		const textInserter = require("./text_inserter");
		const resource = require("./resource_loader");
		const fileImport = require("./markdown_import")(codemirror);
		const fileExport = require("./file_saver");
		const documentTitle = require("./document_title");
		const unsavedChanges = require("./unsaved_changes");

		return {
			fileNew() {
				if (!unsavedChanges.confirmContinue()) {
					return;
				}
				codemirror.setValue("");
				documentTitle.setTitle("");
				unsavedChanges.hasChanges = false;
			},

			fileOpen() {
				if (!unsavedChanges.confirmContinue()) {
					return;
				}
				fileImport.chooseFile();
			},

			fileSave() {
				const content = codemirror.getValue();
				const title = documentTitle.getTitle();
				const type = ".md";
				fileExport.saveFile(content, title, type);
				unsavedChanges.hasChanges = false;
			},

			fileExport() {

			},

			fileRename() {
				documentTitle.focus();
			},

			editUndo() {
				if (codemirror == null) {
					return;
				}
				codemirror.undo();
			},

			editRedo() {
				if (codemirror == null) {
					return;
				}
				codemirror.redo();
			},

			editPreferences() {
				$("#settings-modal").addClass("active");
			},

			insertLink() {
				textInserter.insertText(codemirror, "[]()", 1);
			},

			insertImage() {
				textInserter.insertText(codemirror, "![]()", 1);
			},

			insertEquation() {
				textInserter.insertText(codemirror, "$$$$", 2);
			},

			formatBold() {
				textInserter.handleEmphasis(codemirror, "**");
			},

			formatItalic() {
				textInserter.handleEmphasis(codemirror, "*");
			},

			formatStrikethrough() {
				if (codemirror == null) {
					return;
				}
				codemirror.execCommand("newlineAndIndentContinueMarkdownList");
			},

			viewEditor() {

			},

			viewPreview() {

			}
		};
	};
}());