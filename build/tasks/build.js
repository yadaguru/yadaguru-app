var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    changed      = require('gulp-changed'),
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS    = require('gulp-minify-css'),
    paths        = require('../paths');

// Copies js files to dist
// Will eventually uglify/minify/ect
// Could build in transpiling if we decide we want new ES features
gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(gulp.dest(paths.output));
});

// Copies changed html files to dist
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// Copies and transpiles changed scss files
gulp.task('build-css', function () {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.output + '/styles'));
});

// Runs clean, then build tasks in parallel
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-css'],
    callback
  );
});
