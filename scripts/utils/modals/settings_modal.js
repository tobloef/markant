// Logic for the user settings modal.
;(function() {
	const $ = require("jquery");
	const settingsHelper = require("../settings_helper");
	const unsavedChanges = require("../unsaved_changes");

	loadSettings();
	// WHen the save button is clicked, save the user's settings and close the modal
	$("#modal-settings-save").on("click touchstart", function() {
		saveSettings();
		$(this).closest(".modal").removeClass("active");
		unsavedChanges.setHasChanges(false);
		window.location.reload();
	});
	// When the reset button is clicked, reset the user's settings and load the new values.
	$("#modal-settings-reset").on("click touchstart", function() {
		resetSettings();
		loadSettings();
	});

	// Populate the modal's input fields with the users general settings.
	function loadGeneralSettings() {

	}

	// Populate the modal's input fields with the users editor settings.
	function loadEditorSettings() {
		$("#settings-editor-font-family").val(settingsHelper.getSetting("editorFontFamily"));
		$("#settings-editor-font-size").val(settingsHelper.getSetting("editorFontSize"));
		$("#settings-editor-indent-size").val(settingsHelper.getSetting("editorIndentSize"));
		$("#settings-editor-use-tabs").prop("checked", settingsHelper.getSetting("editorUseTabs"));
		$("#settings-editor-theme").val(settingsHelper.getSetting("editorTheme"));
		$("#settings-editor-show-line-numbers").prop("checked", settingsHelper.getSetting("editorShowLineNumbers"));
		$("#settings-editor-show-big-headers").prop("checked", settingsHelper.getSetting("editorBigHeaders"));
	}

	// Populate the modal's input fields with the users viewer settings.
	function loadViewerSettings() {
		$("#settings-viewer-theme").val(settingsHelper.getSetting("viewerTheme"));
		$("#settings-viewer-font-family").val(settingsHelper.getSetting("viewerFontFamily"));
		$("#settings-viewer-font-size").val(settingsHelper.getSetting("viewerFontSize"));
		$("#settings-viewer-hljs-theme").val(settingsHelper.getSetting("viewerHljsTheme"));
		$("#settings-viewer-hljs-tab-size").val(settingsHelper.getSetting("hljsTabSize"));
		$("#settings-viewer-math-renderer").val(settingsHelper.getSetting("viewerMathRenderer"));
	}

	// Populate the modal's input fields with the users settings.
	function loadSettings() {
		loadGeneralSettings();
		loadEditorSettings();
		loadViewerSettings();
	}

	// Save the values of the input fields for the user's general settings.
	function saveGeneralSettings() {

	}

	// Save the values of the input fields for the user's editor settings.
	function saveEditorSettings() {
		settingsHelper.setSetting("editorFontFamily", $("#settings-editor-font-family").val());
		settingsHelper.setSetting("editorFontSize", parseInt($("#settings-editor-font-size").val(), 10));
		settingsHelper.setSetting("editorIndentSize", parseInt($("#settings-editor-indent-size").val(), 10));
		settingsHelper.setSetting("editorUseTabs", $("#settings-editor-use-tabs").prop("checked"));
		settingsHelper.setSetting("editorTheme", $("#settings-editor-theme").val());
		settingsHelper.setSetting("editorShowLineNumbers", $("#settings-editor-show-line-numbers").prop("checked"));
		settingsHelper.setSetting("editorBigHeader", $("#settings-editor-big-headers").prop("checked"));
	}

	// Save the values of the input fields for the user's viewer settings.
	function saveViewerSettings() {
		settingsHelper.setSetting("viewerTheme", $("#settings-viewer-theme").val());
		settingsHelper.setSetting("viewerFontFamily", $("#settings-viewer-font-family").val());
		settingsHelper.setSetting("viewerFontSize", parseInt($("#settings-viewer-font-size").val(), 10));
		settingsHelper.setSetting("viewerHljsTheme", $("#settings-viewer-hljs-theme").val());
		settingsHelper.setSetting("hljsTabSize", parseInt($("#settings-viewer-hljs-tab-size").val(), 10));
		settingsHelper.setSetting("viewerMathRenderer", $("#settings-viewer-math-renderer").val());
	}

	// Save all the user's settings.
	function saveSettings() {
		saveGeneralSettings();
		saveEditorSettings();
		saveViewerSettings();
	}

	// Reset the all the user's settings.
	function resetSettings() {
		const response = confirm("Are you sure you want to reset your settings? This cannot be undone.");
		if (response) {
			settingsHelper.reset();
		}
	}
}());
