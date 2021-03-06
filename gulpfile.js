var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var shell = require('gulp-shell');
var server = require('gulp-develop-server');
var source = require("vinyl-source-stream");
var browserify = require('browserify');
var reactify = require('reactify');

var SOURCE = {
  CLIENT: {
    FOLDER: './client/sources',
    MARKUPS: './client/sources/**/*.html',
    STYLES: './client/sources/**/*.css',
    SCRIPTS: './client/sources/**/*.jsx',
    APPLICATION_VIEW: 'index.html',
    APPLICATION_STYLE: 'application.css',
    APPLICATION_SCRIPT: 'application.jsx'
  },
  SERVER: {
    FOLDER: './server/sources',
    SCRIPTS: './server/sources/**/*.js',
    APPLICATION_SCRIPT: 'application.js'
  }
};

var BUILD = {
  CLIENT: {
    FOLDER: './client/build',
    APPLICATION_VIEW: 'index.html',
    APPLICATION_STYLE: 'application.css',
    APPLICATION_SCRIPT: 'application.js'
  }
};

var SERVER_PORT = 3000;
var PROXY_PORT = 9000;
var SERVER_API_ROOT = '/api';

function setupProxy() {
  var url = require('url');
  var proxy = require('proxy-middleware');
  var options = url.parse('http://localhost:' + SERVER_PORT + SERVER_API_ROOT);
  options.route = SERVER_API_ROOT;
  return proxy(options);
}

// task definition
gulp.task('clean', function() {
  gulp.src(BUILD.CLIENT.FOLDER)
  .pipe(clean());
});

gulp.task('html', function() {
  gulp.src(SOURCE.CLIENT.FOLDER + '/' + SOURCE.CLIENT.APPLICATION_VIEW)
  .pipe(gulp.dest(BUILD.CLIENT.FOLDER))
  .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(SOURCE.CLIENT.FOLDER + '/' + SOURCE.CLIENT.APPLICATION_STYLE)
  .pipe(gulp.dest(BUILD.CLIENT.FOLDER))
  .pipe(connect.reload());
});

gulp.task('javascript', function() {
  browserify({
    entries: SOURCE.CLIENT.FOLDER + '/' + SOURCE.CLIENT.APPLICATION_SCRIPT,
    debug: true
  })
  .transform(reactify)
  .bundle()
  .pipe(source(BUILD.CLIENT.APPLICATION_SCRIPT))
  .pipe(gulp.dest(BUILD.CLIENT.FOLDER))
  .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(SOURCE.CLIENT.MARKUPS, ['html']);
  gulp.watch(SOURCE.CLIENT.STYLES, ['css']);
  gulp.watch(SOURCE.CLIENT.SCRIPTS, ['javascript']);
  gulp.watch(SOURCE.SERVER.SCRIPTS, server.restart);
});

gulp.task('livereload', function() {
  connect.server({
    root: BUILD.CLIENT.FOLDER,
    port: PROXY_PORT,
    livereload: true,
    middleware: function(connect, o) {
      return [setupProxy()];
    }
  });
});

gulp.task('db:migrate',
  shell.task('node ./node_modules/db-migrate/bin/db-migrate up -m ./server/db/migrations/ --config ./server/db/config.json -e development --verbose')
);

gulp.task('db:drop',
  shell.task('node ./node_modules/db-migrate/bin/db-migrate down -m ./server/db/migrations/ --config ./server/db/config.json -e development --verbose')
);

gulp.task('server:start', function() {
  server.listen({path: SOURCE.SERVER.FOLDER + '/' + SOURCE.SERVER.APPLICATION_SCRIPT});
});

// task declaration
gulp.task('build', ['clean', 'html', 'css', 'javascript']);
gulp.task('development', ['build', 'livereload', 'watch', 'server:start']);

