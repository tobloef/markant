;(function() {
	const hljs = require("highlight.js");

	const config = {
		// Id of the viewer element.
		viewerElementId: "viewer",

		// Wait for the user to stop typing before the Markdown is rendered.
		useDelayedRendering: true,

		// The minimum delay between keystrokes before the user is deemed done typing.
		renderDelay: 200,

		markdownit: {
			html: true,
			highlight: function(str, lang) {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(lang, str).value;
					} catch (exception) {
						console.log("Couldn't highlight code with language " + lang, exception);
					}
				}

				return "";
			}
		},

		// Which math renderer to use. The valid options are:
		//    "KaTex"
		//    "MathJax"
		mathRenderer: "KaTex",

		// KaTex configuration
		KaTex: {

		},

		// Url for the MathJax CDN.
		mathjaxUrl: "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML",

		// MathJax configuration
		MathJax: {
			messageStyle: "none"
		}
	};

	module.exports = config;
}());
