var gulp = require('gulp');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['minifyCSS']);

gulp.task('serve', ['minifyCSS'], function () {
  browserSync({
    proxy: 'localhost'
  });
  gulp.watch('./app/css/*.css', ['minifyCSS']);
  gulp.watch('./*').on('change', reload);
});

gulp.task('minifyCSS', function() {
  return gulp.src('./app/css/main.css')
    .pipe(minifyCSS())
    .pipe(rename({ extname : '.min.css'} ))
    .pipe(gulp.dest('./css/'))
    .pipe(reload( {stream: true} ));
});
