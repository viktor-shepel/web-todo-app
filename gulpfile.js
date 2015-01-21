var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var shell = require('gulp-shell');
var source = require("vinyl-source-stream");
var browserify = require('browserify');
var reactify = require('reactify');

var SOURCE = {
  FOLDER: './client/sources',
  MARKUPS: './client/sources/**/*.html',
  STYLES: './client/sources/**/*.css',
  SCRIPTS: './client/sources/**/*.jsx',
  APPLICATION_VIEW: 'index.html',
  APPLICATION_STYLE: 'application.css',
  APPLICATION_SCRIPT: 'application.jsx'
};

var BUILD = {
  FOLDER: './client/build',
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
  browserify({
    entries: SOURCE.FOLDER + '/' + SOURCE.APPLICATION_SCRIPT,
    debug: true
  })
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

gulp.task('db:migrate',
  shell.task('node ./node_modules/db-migrate/bin/db-migrate up -m ./server/db/migrations/ --config ./server/db/config.json -e development --verbose')
);

gulp.task('db:drop',
  shell.task('node ./node_modules/db-migrate/bin/db-migrate down -m ./server/db/migrations/ --config ./server/db/config.json -e development --verbose')
);

gulp.task('server:start',
  shell.task('node server/sources/application.js')
);

// task declaration
gulp.task('build', ['clean', 'html', 'css', 'javascript']);
gulp.task('development', ['build', 'livereload', 'watch']);

