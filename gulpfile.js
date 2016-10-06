var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var browserifyCss = require("browserify-css");

var paths = {
	scripts: "scripts/**/*",
	styles: "styles/**/*"
};

gulp.task("default", ["browserify"]);

gulp.task("watch", function() {
	gulp.start(["default"]);
	gulp.watch([paths.scripts, paths.styles], ["default"]);
});

gulp.task("browserify", function() {
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