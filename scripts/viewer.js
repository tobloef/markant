;(function() {
	const fileLoader = require("./utils/file_loader");
	const settingsHelper = require("./utils/settings_helper");
	const $ = require("jquery");
	const hljs = require("highlight.js");
	const markdown = require("markdown-it")({
		html: true
	});
	const lazyHeaders = require("markdown-it-lazy-headers");
	const sanitizer = require("markdown-it-sanitizer");
	const katex = require("markdown-it-katex");
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

	// Set up markdown-it with the needed plugins.
	markdown.use(lazyHeaders);
	markdown.use(sanitizer, {
		removeUnknown: true,
		removeUnbalanced: true,
		img: "",
	});

	// Render the specified Markdown and insert the resulting HTML into the viewer.
	function render(markdownString, callback) {
		const result = markdown.render(markdownString || "");
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

	// Load the user's preferences and apply them to markdown-it.
	function loadUserSettings() {
		const mathRenderer = settingsHelper.getSetting("viewerMathRenderer");
		if (mathRenderer != null) {
			if (mathRenderer.toLowerCase() === "katex") {
				markdown.use(katex);
			} else if (mathRenderer.toLowerCase() === "mathjax") {
				markdown.use(mathjax);
				const mathjaxUrl = mathjaxCdn + mathjaxConfigString;
				fileLoader.getScript(mathjaxUrl, function() {
					MathJax.Hub.Config({
						messageStyle: "none",
					});
					mathjaxReady = true;
				});
			}
		}
		const hljsTheme = settingsHelper.getSetting("viewerHljsTheme");
		if (hljsTheme != null) {
			fileLoader.getStyle(`${hljsThemeDirectory}/${hljsTheme}.css`);
		}
		const viewerTheme = settingsHelper.getSetting("viewerTheme");
		if (viewerTheme != null) {
			fileLoader.getStyle(`${viewerThemeDirectory}/${viewerTheme}.css`);
		}
	}

	// Load the user's preferences and apply them to the existing viewer element.
	function loadStyleSettings() {
		const fontFamily = settingsHelper.getSetting("viewerFontFamily");
		if (fontFamily != null && fontFamily in settingsHelper.fontFamilyMap) {
			$(viewer).css("font-family", `'${settingsHelper.fontFamilyMap[fontFamily]}'`);
		}
		const fontSize = settingsHelper.getSetting("viewerFontSize");
		if (fontSize != null) {
			$(viewer).css("font-size", fontSize);
		}
		const hljsTabSize = settingsHelper.getSetting("hljsTabSize");
		if (hljsTabSize != null) {
			const style = $(`<style>.hljs { tab-size: ${hljsTabSize}; -moz-tab-size: ${hljsTabSize}; }</style>`);
			$("head").append(style);
		}
	}

	module.exports = function(viewerElement) {
		viewer = viewerElement;
		loadUserSettings();
		loadStyleSettings();
		if (useDelayedRendering) {
			module.render = delayedRender;
		} else {
			module.render = render;
		}

		return module;
	};
}());
