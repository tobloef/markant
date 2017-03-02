;(function() {
	const $ = require("jquery");
	const settingsHelper = require("../settings_helper");

	// Load the settings and set the initial values of the modal items.
	function loadSettings() {
		loadGeneralSettings();
		loadEditorSettings();
		loadViewerSettings();
	}

	function loadGeneralSettings() {

	}

	function loadEditorSettings() {
		$("#settings-editor-font-family").val(settingsHelper.getSetting("editorFontFamily"));
		$("#settings-editor-font-size").val(settingsHelper.getSetting("editorFontSize"));
		$("#settings-editor-indent-size").val(settingsHelper.getSetting("editorIndentSize"));
		$("#settings-editor-use-tabs").prop("checked", settingsHelper.getSetting("editorUseTabs"));
		$("#settings-editor-theme").val(settingsHelper.getSetting("editorTheme"));
		$("#settings-editor-show-line-numbers").prop("checked", settingsHelper.getSetting("editorShowLineNumbers"));
		$("#settings-editor-show-big-headers").prop("checked", settingsHelper.getSetting("editorBigHeaders"));
	}

	function loadViewerSettings() {
		$("#settings-viewer-theme").val(settingsHelper.getSetting("viewerTheme"));
		$("#settings-viewer-font-family").val(settingsHelper.getSetting("viewerFontFamily"));
		$("#settings-viewer-font-size").val(settingsHelper.getSetting("viewerFontSize"));
		$("#settings-viewer-hljs-theme").val(settingsHelper.getSetting("viewerHljsTheme"));
		$("#settings-viewer-hljs-tab-size").val(settingsHelper.getSetting("hljsTabSize"));
		$("#settings-viewer-math-renderer").val(settingsHelper.getSetting("viewerMathRenderer"));
	}

	// Save the settings specified in the modal.
	function saveSettings() {
		saveGeneralSettings();
		saveEditorSettings();
		saveViewerSettings();
	}

	function saveGeneralSettings() {

	}

	function saveEditorSettings() {
		settingsHelper.setSetting("editorFontFamily", $("#settings-editor-font-family").val());
		settingsHelper.setSetting("editorFontSize", parseInt($("#settings-editor-font-size").val()));
		settingsHelper.setSetting("editorIndentSize", parseInt($("#settings-editor-indent-size").val()));
		settingsHelper.setSetting("editorUseTabs", $("#settings-editor-use-tabs").prop("checked"));
		settingsHelper.setSetting("editorTheme", $("#settings-editor-theme").val());
		settingsHelper.setSetting("editorShowLineNumbers", $("#settings-editor-show-line-numbers").prop("checked"));
		settingsHelper.setSetting("editorBigHeader", $("#settings-editor-big-headers").prop("checked"));
	}

	function saveViewerSettings() {
		settingsHelper.setSetting("viewerTheme", $("#settings-viewer-theme").val());
		settingsHelper.setSetting("viewerFontFamily", $("#settings-viewer-font-family").val());
		settingsHelper.setSetting("viewerFontSize", parseInt($("#settings-viewer-font-size").val()));
		settingsHelper.setSetting("viewerHljsTheme", $("#settings-viewer-hljs-theme").val());
		settingsHelper.setSetting("hljsTabSize", parseInt($("#settings-viewer-hljs-tab-size").val()));
		settingsHelper.setSetting("viewerMathRenderer", $("#settings-viewer-math-renderer").val());
	}

	function resetSettings() {
		const response = confirm("Are you sure you want to reset your settings? This cannot be undone.");
		if (response) {
			settingsHelper.reset();
		}
	}

	loadSettings();
	$("#modal-settings-save").on("click", function() {
		saveSettings();
		$(this).closest(".modal").removeClass("active");
		window.location.reload();
	});
	$("#modal-settings-reset").on("click", function() {
		resetSettings();
		loadSettings();
	});
}());