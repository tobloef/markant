;(function() {
	const hljs = require("highlight.js");

	// Highlight code snippets with highlight.js
	function highlight(str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				const tag = `<pre class='hljs'><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
				return tag;
			} catch (exception) {
				console.warn(`Couldn't highlight code with language ${lang}`, exception);
			}
		}
		return `<pre class='hljs'><code>${markdown.utils.escapeHtml(str)}</code></pre>`;
	}

	const config = {
		// Wait for the user to stop typing before the Markdown is rendered.
		useDelayedRendering: true,

		// The minimum delay between keystrokes before the user is deemed done typing.
		renderDelay: 200,

		markdownit: {
			html: true,
			highlight,
		},

		markdownitSanitizer: {
			removeUnknown: true,
			removeUnbalanced: true,
			img: "",
		},

		// The style to use with highlight.js for code snippets in the viewer.
		highlightjsStyle: "monokai",

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
			messageStyle: "none",
		},
	};

	module.exports = config;
}());
