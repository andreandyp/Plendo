const browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    gutil = require('gulp-util'),
    vueify = require("vueify"),
    babelify = require('babelify');

gulp.task("vuec", () => {
    var b = browserify({
        entries: "./views/plendo.js",
        transform: [vueify]
    });
    return b.bundle()
            .pipe(source("plendo.min.js"))
            .pipe(buffer())
            .pipe(gulp.dest("./public/js/"));
});


gulp.task("vuep", () => {
    var b = browserify({
        entries: "./views/plendo.js",
        transform: [vueify, ["babelify", { "presets": ["es2015"] }]]
    });
    return b.bundle()
            .pipe(source("plendo.min.js"))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest("./public/js/"));
});