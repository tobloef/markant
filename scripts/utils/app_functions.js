;(function() {
	module.exports = function(codemirror) {
		const $ = require("jquery");
		const textInserter = require("./text_inserter");
		const resource = require("./resource_loader");
		const fileImport = require("./markdown_import")(codemirror);
		const fileExport = require("./file_saver");
		const documentTitle = require("./document_title");

		return {
			fileNew: function() {

			},

			fileOpen: function() {
				fileImport.chooseFile();
			},

			fileSave: function() {
				const content = codemirror.getValue();
				const title = documentTitle.getTitle();
				const type = ".md";
				fileExport.saveFile(content, title, type);
			},

			fileExport: function() {

			},

			fileRename: function() {

			},

			editUndo: function() {
				if (codemirror == null) {
					return;
				}
				codemirror.undo();
			},

			editRedo: function() {
				if (codemirror == null) {
					return;
				}
				codemirror.redo();
			},

			editPreferences: function() {
				$("#settings-modal").addClass("active");
			},

			insertLink: function() {
				textInserter.insertText(codemirror, "[]()", 1);
			},

			insertImage: function() {
				textInserter.insertText(codemirror, "![]()", 1);
			},

			insertEquation: function() {
				textInserter.insertText(codemirror, "$$$$", 2);
			},

			formatBold: function() {
				textInserter.handleEmphasis(codemirror, "**");
			},

			formatItalic: function() {
				textInserter.handleEmphasis(codemirror, "*");
			},

			formatStrikethrough: function() {
				if (codemirror == null) {
					return;
				}
				codemirror.execCommand("newlineAndIndentContinueMarkdownList");
			},

			viewEditor: function() {

			},

			viewPreview: function() {

			}
		};
	};
}());