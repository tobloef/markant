// A library of various functions that can be called by the app.
// This is kept in a seperate module, so the navbar and the shortcuts can call the same functions.
;(function() {
	module.exports = function(codemirror) {
		const $ = require("jquery");
		const textInserter = require("./text_inserter");
		const resource = require("./resource_loader");
		const fileImport = require("./markdown_import")(codemirror);
		const fileExport = require("./file_saver");
		const documentTitle = require("./document_title");
		const unsavedChanges = require("./unsaved_changes");
		const settings = require("./settings_helper");
		const paneResizer = require("./pane_resizer")();
		const exportHtml = require("./exporters/html");

		return {
			// Discard the current document and create an empty one.
			fileNew() {
				if (!unsavedChanges.confirmContinue()) {
					return;
				}
				codemirror.setValue(settings.getDefaultValue("documentContent"));
				documentTitle.setTitle(settings.getDefaultValue("documentTitle"));
				unsavedChanges.setHasChanges(false);
				settings.setSetting("documentContent", settings.getDefaultValue("documentContent"));
				settings.setSetting("documentTitle", settings.getDefaultValue("documentTitle"));
			},

			// Open a markdown file from the user's computer
			fileOpen() {
				if (!unsavedChanges.confirmContinue()) {
					return;
				}
				fileImport.chooseFile();
			},

			// Save the current markdown document to the user's computer
			fileSave() {
				if (codemirror) {
					const content = codemirror.getValue();
					const title = documentTitle.getTitle();
					const type = ".md";
					fileExport.saveFile(content, title, type);
					unsavedChanges.setHasChanges(false);
					settings.setSetting("documentTitle", settings.getDefaultValue("documentTitle"));
					settings.setSetting("documentContent", settings.getDefaultValue("documentContent"));
				}
			},

			// Convert the current markdown to HTML and export it to the user's local drive
			fileExportHtml() {
				if (codemirror) {
					const content = exportHtml(codemirror.getValue());
					const title = documentTitle.getTitle();
					const type = ".html";
					fileExport.saveFile(content, title, type);
				}
			},

			// Set the focus on the input box for renaming the document
			fileRename() {
				documentTitle.focus();
			},

			// Undo the last action in the editor
			editUndo() {
				if (codemirror) {
					codemirror.undo();
				}
			},

			// Redo the last undone action in the editor
			editRedo() {
				if (codemirror) {
					codemirror.redo();
				}
			},

			// Open the settings modal
			editPreferences() {
				$("#settings-modal").addClass("active");
			},

			// Insert the syntax for a link in the editor and
			// move the cursor inside the brackets for the url
			insertLink() {
				textInserter.insertText(codemirror, "[]()", 1);
			},

			// Insert the syntax for an image in the editor and
			// move the cursor inside the brackets for the url
			insertImage() {
				textInserter.insertText(codemirror, "![]()", 1);
			},

			// Insert the syntax for a math euqation in the editor and
			// move the cursor between the dollar-signs.
			insertEquation() {
				textInserter.insertText(codemirror, "$$$$", 2);
			},

			// Insert the syntax for bold text on both sides of the selected text.
			// If no text is selected, insert it anyway and move the cursor into the middle.
			formatBold() {
				textInserter.handleEmphasis(codemirror, "**");
			},

			// Insert the syntax for italic text on both sides of the selected text.
			// If no text is selected, insert it anyway and move the cursor into the middle.
			formatItalic() {
				textInserter.handleEmphasis(codemirror, "*");
			},

			// Insert the syntax for strikethrough text on both sides of the selected text.
			// If no text is selected, insert it anyway and move the cursor into the middle.
			formatStrikethrough() {
				textInserter.handleEmphasis(codemirror, "~~");
			},

			// Toggle the editor, either hiding or displaying it.
			viewEditor() {
				paneResizer.toggleEditor();
			},

			// Toggle the viewer, either hiding or displaying it.
			viewPreview() {
				paneResizer.toggleViewer();
			}
		};
	};
}());