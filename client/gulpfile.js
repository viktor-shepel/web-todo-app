var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var source = require("vinyl-source-stream");
var browserify = require('browserify');
var reactify = require('reactify');

var SOURCE = {
  FOLDER: './sources',
  MARKUPS: './sources/**/*.html',
  STYLES: './sources/**/*.css',
  SCRIPTS: './sources/**/*.jsx',
  APPLICATION_VIEW: 'index.html',
  APPLICATION_STYLE: 'application.css',
  APPLICATION_SCRIPT: 'application.jsx'
};

var BUILD = {
  FOLDER: './build',
  APPLICATION_VIEW: 'index.html',
  APPLICATION_STYLE: 'application.css',
  APPLICATION_SCRIPT: 'application.js'
};

// task definition
gulp.task('clean', function() {
  gulp.src(BUILD.FOLDER)
  .pipe(clean());
});

gulp.task('html', function() {
  gulp.src(SOURCE.FOLDER + '/' + SOURCE.APPLICATION_VIEW)
  .pipe(gulp.dest(BUILD.FOLDER))
  .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(SOURCE.FOLDER + '/' + SOURCE.APPLICATION_STYLE)
  .pipe(gulp.dest(BUILD.FOLDER))
  .pipe(connect.reload());
});

gulp.task('javascript', function() {
  browserify(SOURCE.FOLDER + '/' + SOURCE.APPLICATION_SCRIPT)
  .transform(reactify)
  .bundle()
  .pipe(source(BUILD.APPLICATION_SCRIPT))
  .pipe(gulp.dest(BUILD.FOLDER))
  .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(SOURCE.MARKUPS, ['html']);
  gulp.watch(SOURCE.STYLES, ['css']);
  gulp.watch(SOURCE.SCRIPTS, ['javascript']);
});

gulp.task('livereload', function() {
  connect.server({
    root: BUILD.FOLDER,
    port: 9000,
    livereload: true
  });
});

// task declaration
gulp.task('build', ['clean', 'html', 'css', 'javascript']);
gulp.task('development', ['build', 'livereload', 'watch']);

