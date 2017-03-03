;(function() {
	const $ = require("jquery");
	const documentTitle = require("./document_title");
	const unsavedChanges = require("./unsaved_changes");

	let codemirror;

	if (window.FileReader) {
		$("#file-input").on("change", fileInput);
	}

	function fileInput(event) {
		event.stopPropagation();
		event.preventDefault();
		let files = null;
		if (event.target && event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0];
			const reader = new FileReader();
			const fileName = selectedFile.name;
			reader.onloadend = function(event) {
				handleUpload(event, fileName);
			};
			reader.readAsText(selectedFile);
		}
		$("#file-input").val("");
	}

	function handleUpload(event, fileName) {
		if (event.target.readyState !== 2) {
			return;
		}
		if (event.target.error) {
			alert("There was an error opening the file.");
			return;
		}
		const content = event.target.result;
		if (codemirror) {
			documentTitle.setTitle(fileName);
			codemirror.setValue(content);
			unsavedChanges.hasChanges = false;
		}
	}

	function chooseFile() {
		if (!window.FileReader) {
			alert("Your browser doesn't support opening files, consider upgrading to a newer version of your browser.");
			return;
		}
		$("#file-input").click();
	}

	module.exports = function(newCodemirror) {
		codemirror = newCodemirror;
		return {
			chooseFile
		};
	};
}());
