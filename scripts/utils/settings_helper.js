;(function() {
	const defaultValues = {
		"editorFontFamily": "monospace",
		"editorFontSize": 13,
		"editorIndentSize": 4,
		"editorUseTabs": true,
		"editorTheme": "light",
		"editorShowLineNumbers": false,
		"editorUseBigHeaders": false,
	};

	function getSetting(key) {
		let setting;
		try {
			setting = JSON.parse(localStorage.getItem(key));
		} catch (exception) {
			console.error(`Error getting setting with key ${key}.`);
		}
		if (setting == null) {
			setting = defaultValues[key];
			setSetting(key, setting);
		}
		return setting;
	}

	function setSetting(key, value) {
		if (value == null && key in defaultValues) {
			value = defaultValues[key];
		}
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (exception) {
			console.error(`Error saving setting.\nKey: ${key}\nValue: ${value}\n`);
		}
	}

	module.exports = {
		getSetting,
		setSetting
	};
}());