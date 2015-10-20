var gulp        = require('gulp'),
    paths       = require('../paths'),
    browserSync = require('browser-sync');

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
  gulp.watch(paths.source, ['build-system', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.scss, ['build-css', browserSync.reload]).on('change', reportChange);
});
