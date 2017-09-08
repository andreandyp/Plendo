"use strict";

const browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	buffer = require("vinyl-buffer"),
	gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	babelify = require("babelify"),
	vueify = require("vueify");
require("gulp-util");


gulp.task("vuec", () => {
	var b = browserify({
		entries: "./views/plendo.js",
		transform: [ ["babelify", { "presets": ["env"] }], vueify]
	});
	return b.bundle()
		.pipe(source("plendo.min.js"))
		.pipe(buffer())
		.pipe(gulp.dest("./public/js/"));
});


gulp.task("vuep", () => {
	var b = browserify({
		entries: "./views/plendo.js",
		transform: [ ["babelify", { "presets": ["env"] }], vueify]
	});
	return b.bundle()
		.pipe(source("plendo.min.js"))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest("./public/js/"));
});