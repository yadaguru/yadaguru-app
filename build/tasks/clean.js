var gulp       = require('gulp'),
    paths      = require('../paths'),
    del        = require('del'),
    vinylPaths = require('vinyl-paths');

/**
 * Deletes the dist directory, and all built assets in src/
 */
gulp.task('clean', function() {
  return del([
    paths.dest.js + '/*',
    paths.dest.css + '/*',
    paths.dest.images + '/*',
    paths.dest.fonts + '/*',
    paths.dest.output + '/*'
  ]);
});
