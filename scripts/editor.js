"use strict";

;(function(){
	var CodeMirror = require("codemirror");
	require("codemirror/mode/markdown/markdown");
	var config = require("./config/editor");

	module.exports = function(editorElementId) {
		var module = {};

		var element = document.getElementById(editorElementId);
		var codemirror = new CodeMirror(element);

		module.codemirror = codemirror;

		return module;
	};
})();