// Main module for the HTML preview logic.
;(function() {
	const $ = require("jquery");
	const hljs = require("highlight.js");
	const resourceLoader = require("./utils/resource_loader");
	const settingsHelper = require("./utils/settings_helper");
	const styleUpdater = require("./utils/style_updater");
	const markdownIt = require("markdown-it")({
		html: true
	});
	const lazyHeaders = require("markdown-it-lazy-headers");
	const sanitizer = require("markdown-it-sanitizer");
	const katex = require("./utils/markdown_it_katex");
	const mathjax = require("markdown-it-mathjax");

	// Wait for the user to stop typing before the Markdown is rendered.
	const useDelayedRendering = true;
	// The minimum delay between keystrokes before the user is deemed done typing.
	const renderDelay = 200;
	// Url for the MathJax CDN.
	const mathjaxCdn = "https://cdn.mathjax.org/mathjax/latest/MathJax.js";
	// Configuration string used when loading Mathjax.js
	const mathjaxConfigString = "?config=TeX-MML-AM_CHTML";
	// Directory for styles for the viewer.
	const viewerThemeDirectory = "build/viewer/themes";
	// Directory for styles for Highlight.js
	const hljsThemeDirectory = "build/lib/highlight.js/styles";

	let renderTimeout;
	let viewer;
	let mathjaxReady;

	// Render the specified Markdown and insert the resulting HTML into the viewer.
	function render(markdownString, callback) {
		const result = markdownIt.render(markdownString || "");
		viewer.innerHTML = result;
		if (mathjaxReady) {
			MathJax.Hub.Queue(["Typeset", MathJax.Hub, viewer]);
		}
		$("#viewer pre code").each(function(i, block) {
			hljs.highlightBlock(block);
		});
		if (callback) {
			callback();
		}
	}

	// Wait for the user to stop typing before rendering the Markdown.
	function delayedRender(markdownString, callback) {
		clearTimeout(renderTimeout);
		renderTimeout = setTimeout(function() {
			render(markdownString);
			if (callback) {
				callback();
			}
		}, renderDelay);
	}

	// Load the user's preferences and apply them.
	function loadUserSettings() {
		markdownIt.use(lazyHeaders);
		markdownIt.use(sanitizer);
		const mathRenderer = settingsHelper.getSetting("viewerMathRenderer");
		if (mathRenderer) {
			if (mathRenderer.toLowerCase() === "mathjax") {
				markdownIt.use(mathjax);
				const mathjaxUrl = mathjaxCdn + mathjaxConfigString;
				resourceLoader.addScript(mathjaxUrl, function() {
					MathJax.Hub.Config({
						messageStyle: "none",
					});
					mathjaxReady = true;
				});
			} else if (mathRenderer.toLowerCase() === "katex") {
				markdownIt.use(katex);
				$.get("build/lib/katex/dist/katex.min.css", function(style) {
					styleUpdater.append("viewer-styles", style);
				});
			}
		}
		const hljsTheme = settingsHelper.getSetting("viewerHljsTheme");
		if (hljsTheme) {
			$.get(`${hljsThemeDirectory}/${hljsTheme}.css`, function(style) {
				styleUpdater.append("viewer-styles", style);
			});
		}
		const viewerTheme = settingsHelper.getSetting("viewerTheme");
		if (viewerTheme) {
			$.get(`${viewerThemeDirectory}/${viewerTheme}.css`, function(style) {
				styleUpdater.append("viewer-styles", style);
			});
		}
	}

	// Load the user's preferences and apply them to the existing viewer element.
	function loadStyleSettings() {
		const fontFamily = settingsHelper.getSetting("viewerFontFamily");
		if (fontFamily && fontFamily in settingsHelper.fontFamilyMap) {
			const style = `#viewer { font-family: ${settingsHelper.fontFamilyMap[fontFamily]}; }`;
			styleUpdater.append("viewer-styles", style);
		}
		const fontSize = settingsHelper.getSetting("viewerFontSize");
		if (fontSize) {
			const style = `#viewer { font-size: ${fontSize}; }`;
			styleUpdater.append("viewer-styles", style);
		}
		const hljsTabSize = settingsHelper.getSetting("hljsTabSize");
		if (hljsTabSize) {
			const style = `.hljs { tab-size: ${hljsTabSize}; -moz-tab-size: ${hljsTabSize}; }`;
			styleUpdater.append("viewer-styles", style);
		}
	}

	module.exports = function(viewerElement) {
		viewer = viewerElement;
		loadUserSettings();
		loadStyleSettings();
		if (useDelayedRendering) {
			exports.render = delayedRender;
		} else {
			exports.render = render;
		}

		return exports;
	};
}());
