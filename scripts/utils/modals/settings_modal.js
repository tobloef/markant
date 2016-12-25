;(function() {
	const $ = require("jquery");
	const settingsHelper = require("../settings_helper");

	// Load the settings and set the initial values of the modal items.
	function loadSettings() {
		$("#settings-editor-font-family").val(settingsHelper.getSetting("editorFontFamily"));
		$("#settings-editor-font-size").val(settingsHelper.getSetting("editorFontSize"));
		$("#settings-editor-indent-size").val(settingsHelper.getSetting("editorIndentSize"));
		$("#settings-editor-use-tabs").val(settingsHelper.getSetting("editorUseTabs"));
		$("#settings-editor-theme").val(settingsHelper.getSetting("editorTheme"));
		$("#settings-editor-show-line-numbers").val(settingsHelper.getSetting("editorShowLineNumbers"));
	}

	// Save the settings specified in the modal.
	function saveSettings() {
		settingsHelper.setSetting("editorFontFamily", $("#settings-editor-font-family").val());
		settingsHelper.setSetting("editorFontSize", parseInt($("#settings-editor-font-size").val()));
		settingsHelper.setSetting("editorIndentSize", parseInt($("#settings-editor-indent-size").val()));
		settingsHelper.setSetting("editorUseTabs", $("#settings-editor-use-tabs").val());
		settingsHelper.setSetting("editorTheme", $("#settings-editor-theme").val());
		settingsHelper.setSetting("editorShowLineNumbers", $("#settings-editor-show-line-numbers").val());

	}

	module.exports = function() {
		loadSettings();
		$("#modal-settings-save").on("click", function() {
			saveSettings();
			$(this).closest(".modal").removeClass("active");
			window.location.reload();
		});
	};
}());