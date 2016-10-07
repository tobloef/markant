"use strict";

require("../styles/editor.css");

var config = require("./config/app");
var renderer = require("./renderer")(config.viewerElementId);
var editor = require("./editor")(config.editorElementId);

editor.codemirror.on("change", function() {
	renderer.render(editor.codemirror.getValue());
});