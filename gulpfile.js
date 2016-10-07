var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var browserifyCss = require("browserify-css");
var del = require("del");
var eslint = require("gulp-eslint");
var csslint = require("gulp-csslint");

gulp.task("default", ["clean", "browserify"]);

gulp.task("watch", function() {
	gulp.start(["default"]);
	gulp.watch(["scripts/**/*", "styles/**/*"], ["default"]);
});

gulp.task("clean", function() {
	return del(['build']);
});

gulp.task("jslint", function() {
	return gulp.src("scripts/**/*.js")
		.pipe(eslint())
		.pipe(eslint.formatEach())
		.pipe(eslint.failAfterError());
});

gulp.task("csslint", function() {
  return gulp.src(['**/*.css', "!node_modules/**", "!build/**/*"])
    .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(csslint.failFormatter());
});

gulp.task("lint", function() {
	gulp.start(["jslint", "csslint"]);
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

			return b.bundle()
			 .pipe(source(file + "-bundle.js"))
			 .pipe(gulp.dest(destDir));
		});
	};

	return entryPoints(["landing-page", "app"]);
});
