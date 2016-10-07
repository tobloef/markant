var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var browserifyCss = require("browserify-css");
var del = require("del");

gulp.task("default", ["clean", "browserify"]);

gulp.task("watch", function() {
	gulp.start(["default"]);
	gulp.watch(["scripts/**/*", "styles/**/*"], ["default"]);
});

gulp.task("clean", function() {
	del(['build']);
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
			 .pipe(source(file + "-bundle.js"))
			 .pipe(gulp.dest(destDir));
		});
	};

	entryPoints(["landing-page", "app"]);
});