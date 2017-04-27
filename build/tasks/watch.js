var gulp        = require('gulp'),
    paths       = require('../paths'),
    browserSync = require('browser-sync');

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

/**
 * Watches for changes to hs, html, and scss files, and runs dev builds when there are changes
 */
gulp.task('watch', [], function() {
  gulp.watch([
    paths.src.js, 
    paths.src.html, 
    paths.src.scss, 
    '!' + paths.src.assets // We don't want to watch changes to the assets folder, as these are
                           // deleted & created as part of the build process
    ], 
    ['build-dev', browserSync.reload]).on('change', reportChange);
});
