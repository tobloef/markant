;(function() {
	const defaultValues = {
		"editorFontFamily": "monospace",
		"editorFontSize": 13,
		"editorIndentSize": 4,
		"editorUseTabs": true,
		"editorTheme": "light",
		"editorShowLineNumbers": false,
		"editorUseBigHeaders": false,
		"markdown": "",
		"documentTitle": "Untitled document",
		"leftPanePercentage": 50,
		"rightPanePercentage": 50,
	};

	function getSetting(key) {
		let setting;
		try {
			setting = JSON.parse(localStorage.getItem(key));
		} catch (exception) {
			console.error(`Error getting setting with key ${key}.`);
		}
		if (setting == null) {
			setting = getDefaultValue(key);
			setSetting(key, setting);
		}
		return setting;
	}

	function setSetting(key, value) {
		if (value == null) {
			value = getDefaultValue(key);
		}
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (exception) {
			console.error(`Error saving setting.\nKey: ${key}\nValue: ${value}\n`);
		}
	}

	function getDefaultValue(key) {
		if (key in defaultValues) {
			return defaultValues[key];
		}
	}

	module.exports = {
		getSetting,
		setSetting
	};
}());