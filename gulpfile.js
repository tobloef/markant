/* eslint-disable import/no-extraneous-dependencies */
const gulp = require("gulp");
const source = require("vinyl-source-stream");
const browserify = require("browserify");
const browserifyCss = require("browserify-css");
const del = require("del");
const eslint = require("gulp-eslint");
const csslint = require("gulp-csslint");
const gutil = require("gulp-util");

gulp.task("default", [/*"clean",*/ "browserify", "font-awesome"]);

gulp.task("browserify", /*["clean"],*/ function() {
	const destDir = "./build";

	const entryPoints = function(files) {
		files.forEach(function(file) {
			const b = browserify({
				entries: [`./scripts/${file}.js`],
				debug: true,
			});

			b.transform(browserifyCss);

			return b.bundle()
				.pipe(source(`${file}-bundle.js`))
				.pipe(gulp.dest(destDir));
		});
	};

	return entryPoints(["app"]);
});

gulp.task("font-awesome", [/*"clean",*/ "browserify"], function() {
	const destDir = "./build/lib/font-awesome";
	gulp.src(["node_modules/font-awesome/{css,fonts}/**/*"])
		.pipe(gulp.dest(destDir));
});

gulp.task("watch", function() {
	gulp.start(["default"]);
	gulp.watch(["scripts/**/*", "styles/**/*"], ["default"]);
});

gulp.task("clean", function() {
	return del(["build"]);
});

gulp.task("jslint", function() {
	return gulp.src(["scripts/**/*.js", "gulpfile.js"])
		.pipe(eslint())
		.pipe(eslint.formatEach())
		.pipe(eslint.failAfterError());
});

gulp.task("csslint", function() {
	return gulp.src(["**/*.css", "!node_modules/**", "!build/**/*"])
		.pipe(csslint())
		.pipe(csslint.formatter())
		.pipe(csslint.failFormatter());
});

gulp.task("lint", function() {
	gulp.start(["jslint", "csslint"]);
});