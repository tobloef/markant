;(function() {
	const $ = require("jquery");
	const documentTitle = require("./document_title");
	const unsavedChanges = require("./unsaved_changes");

	let codemirror;

	$("#file-input").on("change", function(event) {
		if (window.FileReader) {
			const selectedFile = event.target.files[0];
			const reader = new FileReader();
			reader.onloadend = (function(file) {
				const fileName = file.name;
				return function(event) {
					handleUpload(event, fileName);
				};
			})(selectedFile);
			reader.readAsText(selectedFile);
		}
		$("#file-input").val("");
	});

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
