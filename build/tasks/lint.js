var gulp    = require('gulp'),
    paths   = require('../paths'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish');

// Run jshint on all
gulp.task('lint', function() {
  return gulp.src(paths.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
