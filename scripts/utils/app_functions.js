;(function() {
	module.exports = function(codemirror) {
		const $ = require("jquery");
		const textInserter = require("./text_inserter");
		const resource = require("./resource_loader");
		const uploader = require("./file_import")(codemirror);

		return {
			fileNew: function() {

			},

			fileOpen: function() {
				uploader.chooseFile();
			},

			fileSave: function() {

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