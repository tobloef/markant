require("../styles/editor.css");

var md = require('markdown-it')();
var CodeMirror = require("codemirror");
require("codemirror/mode/markdown/markdown");

var config = {
	autofocus: true,
	mode: "markdown"
};

var editor = CodeMirror(document.getElementById("editor"), config);
editor.on("change", onChange);

var renderTimeout;

function onChange() {
	clearTimeout(renderTimeout);
	renderTimeout = setTimeout(render, 200);
}

function render() {
	var result = md.render(editor.getValue());
	document.getElementById("viewer").innerHTML = result;
}