var gulp         = require('gulp'),
    rev          = require('gulp-rev'),
    webpack      = require('gulp-webpack'),
    revReplace   = require('gulp-rev-replace'),
    plumber      = require('gulp-plumber'),
    changed      = require('gulp-changed'),
    dbg          = require('gulp-debug'),
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
  return gulp.src(paths.root + 'main.js')
    .pipe(webpack(require('../../webpack.config.js')))
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(rev())
    .pipe(gulp.dest(paths.output))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest(paths.buildAssets + 'js'));
});

// Copies changed html files to dist
gulp.task('build-html', function () {
  var manifests = gulp.src(paths.buildAssets + '**/rev-manifest.json');
  return gulp.src(paths.html)
    .pipe(revReplace({ manifest: manifests, canonicalUrls: false }))
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
    .pipe(rev())
    .pipe(gulp.dest(paths.output + '/styles'))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest(paths.buildAssets + 'css'));
});

// Runs clean, then build tasks in parallel
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-css'],
    'build-html',
    callback
  );
});
