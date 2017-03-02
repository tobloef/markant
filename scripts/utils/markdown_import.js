;(function() {
	const $ = require("jquery");

	let codemirror;

	if (window.FileReader) {
		const reader = new FileReader();
		reader.onload = handleUpload;
		$("#file-input").on("change", function(event) {
			reader.readAsText(event.target.files[0]);
		});
	}

	function handleUpload(event) {
		if (event.target.readyState !== 2) {
			return;
		}
		if (event.target.error) {
			alert("There was an error opening the file.");
			return;
		}
		const content = event.target.result;
		if (codemirror) {
			codemirror.setValue(content);
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
