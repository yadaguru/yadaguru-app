var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    changed      = require('gulp-changed'),
    revAll       = require('gulp-rev-all'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    gulpif       = require('gulp-if'),
    debug        = require('gulp-debug'),
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS    = require('gulp-minify-css'),
    paths        = require('../paths');


/**
 * Concats all vendor JS files specified in build/vendor.js, and saves
 * the result in src/assets/js
 */
gulp.task('build-vendor-js', function() {
  return gulp.src(paths.src.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.dest.js));
});

/**
 * Concats all vendor CSS files specified in build/vendor.js, and saves
 * the result in src/assets/css
 */
gulp.task('build-vendor-css', function() {
  return gulp.src(paths.src.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.dest.css));
});

/**
 * Copies all vendor font files specified in build/vendor.js, and saves
 * the result in src/assets/fonts
 */
gulp.task('build-vendor-fonts', function() {
  return gulp.src(paths.src.vendor.fonts)
    .pipe(gulp.dest(paths.dest.fonts));
});

/**
 * Copies require.js from the vendor folder to src/assets/js
 */
gulp.task('build-requirejs', function() {
  return gulp.src(paths.src.requirejs)
    .pipe(gulp.dest(paths.dest.js))
});

/**
 * Copies files in /images to /src/images
 */
gulp.task('build-images', function() {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dest.images))
});


/**
 * Compiles CSS and copies tp /src/assets/css
 */
gulp.task('build-css', function () {
  return gulp.src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dest.css));
});

/**
 * Copies and revisions all js, html, and built asset files to the dist/ folder
 * Also uglifies JS files
 */
gulp.task('build-system', ['constants'], function() {
  return gulp.src([paths.src.js, paths.src.html, paths.src.assets])
    .pipe(gulpif(/^.*\.js$/, uglify()))
    .pipe(revAll.revision({
      dontRenameFile: [
      /^.*html$/,
      ],
      dontUpdateReference: [
      /^.*html$/,
      ],
      dontSearchFile: [
        /^.*vendor.js$/
      ]
    }))
    .pipe(gulp.dest(paths.dest.output))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(paths.dest.output))
});

/**
 * Same as build-system, but does not run the uglify step
 */
gulp.task('build-system-dev', ['constants'], function() {
  return gulp.src([paths.src.js, paths.src.html, paths.src.assets])
    .pipe(revAll.revision({
      dontRenameFile: [
      /^.*html$/,
      ],
      dontUpdateReference: [
      /^.*html$/,
      ],
      dontSearchFile: [
        /^.*vendor.js$/
      ]
    }))
    .pipe(gulp.dest(paths.dest.output))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(paths.dest.output))
});

/**
 * Runs clean, then builds all assets, uglifies JS, and revisions and copies all files to
 * dist/
 */
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    [
      'build-requirejs', 
      'build-vendor-js', 
      'build-vendor-css', 
      'build-vendor-fonts',
      'build-images',
      'build-css'
    ],
    'build-system',
    callback
  );
});

/**
 * Runs clean, then builds all assets, and revisions and copies all files to dist/
 */
gulp.task('build-dev', function(callback) {
  return runSequence(
    'clean',
    [
      'build-requirejs', 
      'build-vendor-js', 
      'build-vendor-css', 
      'build-vendor-fonts',
      'build-images',
      'build-css'
    ],
    'build-system-dev',
    callback
  );
});

