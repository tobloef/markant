/* eslint-disable import/no-extraneous-dependencies */
const gulp = require("gulp");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const browserify = require("browserify");
const browserifyCss = require("browserify-css");
const del = require("del");
const eslint = require("gulp-eslint");
const csslint = require("gulp-csslint");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const importCss = require('gulp-import-css');

const parentDestDir = "./build";
const scriptEntryPoints = ["app"];
const styleEntryPoints = ["app"];

gulp.task("default", ["browserify", "bundle-styles", "font-awesome", "codemirror-themes", "hljs-styles"]);

gulp.task("browserify", function() {
	scriptEntryPoints.forEach(function(file) {
		const b = browserify({
			entries: [`./scripts/${file}.js`],
			debug: true,
			fullPaths: true
		});

		return b.bundle()
			.pipe(source(`${file}-bundle.js`))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write("./"))
			.pipe(gulp.dest(parentDestDir));
	});
});

gulp.task("bundle-styles", function() {
	styleEntryPoints.forEach(function(file) {
		gulp.src(`./styles/${file}.css`)
			.pipe(importCss())
			.pipe(rename(`${file}-bundle.css`))
			.pipe(gulp.dest(parentDestDir));
	});
});

gulp.task("uglify", function() {
	scriptEntryPoints.forEach(function(file) {
		gulp.src([`build/${file}-bundle.js`])
			.pipe(buffer())
			.pipe(babel({
				presets: ["es2015"],
			}))
			.pipe(uglify())
			.pipe(rename({ suffix: ".min" }))
			.pipe(gulp.dest(function(filename) {
				return filename.base;
			}));
	});
});

gulp.task("font-awesome", function() {
	const destDir = `${parentDestDir}/lib/font-awesome`;
	gulp.src(["node_modules/font-awesome/{css,fonts}/**/*"])
		.pipe(gulp.dest(destDir));
});

gulp.task("codemirror-themes", function() {
	const destDir = `${parentDestDir}/lib/codemirror/theme`;
	gulp.src([
		"node_modules/codemirror/theme/*.css",
		"styles/editor/themes/*.css",
	])
	.pipe(gulp.dest(destDir));
});

gulp.task("hljs-styles", function() {
	const destDir = `${parentDestDir}/lib/highlight.js/styles`;
	gulp.src("node_modules/highlight.js/styles/*.css")
		.pipe(gulp.dest(destDir));
});

gulp.task("watch", function() {
	gulp.start(["default"]);
	gulp.watch(["scripts/**/*", "styles/**/*"], ["default"]);
});

gulp.task("watch-css", function() {
	gulp.start(["bundle-styles"]);
	gulp.watch(["styles/**/*"], ["bundle-styles"]);
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
