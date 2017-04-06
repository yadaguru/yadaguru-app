var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    changed      = require('gulp-changed'),
    revAll       = require('gulp-rev-all'),
    concat       = require('gulp-concat'),
    debug        = require('gulp-debug'),
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS    = require('gulp-minify-css'),
    paths        = require('../paths');

// Copies js files to dist
// Will eventually uglify/minify/ect
// Could build in transpiling if we decide we want new ES features
gulp.task('build-system', ['constants'], function() {
  return gulp.src(paths.source)
    .pipe(revAll.revision({
      dontRenameFile: [
      /^.*html$/,
      ],
      dontSearchFile: [
        /^.*vendor.js$/
      ]
    }))
    .pipe(gulp.dest(paths.output))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(paths.output))
});

gulp.task('build-vendor-js', function() {
  return gulp.src(paths.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.assets.js));
});

gulp.task('build-vendor-css', function() {
  return gulp.src(paths.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.assets.css));
});

gulp.task('build-vendor-fonts', function() {
  return gulp.src(paths.vendor.fonts)
    .pipe(gulp.dest(paths.assets.fonts));
});

gulp.task('build-requirejs', function() {
  return gulp.src(paths.requirejs)
    .pipe(gulp.dest(paths.assets.js))
});

gulp.task('build-images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.assets.images))
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
    .pipe(gulp.dest(paths.assets.css));
});

// Runs clean, then build tasks in parallel
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    [
      'build-vendor-js', 
      'build-vendor-css', 
      'build-vendor-fonts',
      'build-requirejs', 
      'build-images',
      'build-css'
    ],
    'build-system',
    callback
  );
});
