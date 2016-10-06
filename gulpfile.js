var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var browserifyCss = require("browserify-css");

gulp.task("default", function() {
	var destDir = "./build";

	var entryPoints = function(files) {
		files.forEach(function(file) {
			var b = browserify({
				entries: ["./scripts/" + file + ".js"],
				debug: true
			});

			b.transform(browserifyCss);

			b.bundle()
			 .pipe(source(file + "_bundle.js"))
			 .pipe(gulp.dest(destDir));
		});
	};

	entryPoints(["landing", "editor"]);
});