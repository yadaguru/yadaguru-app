var gulp = require('gulp');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', ['minifyCSS']);

gulp.task('serve', ['minifyCSS'], function () {
  browserSync.init({
    server: { 
      baseDir: "./yadaApp", 
    }
  });
  gulp.watch('./yadaApp/css/*.css', ['minifyCSS']);
  gulp.watch('./yadaApp/**').on('change', reload);
});

gulp.task('minifyCSS', function() {
  return gulp.src('./yadaApp/css/main.css')
    .pipe(minifyCSS())
    .pipe(rename({ extname : '.min.css'} ))
    .pipe(gulp.dest('./yadaApp/css/'))
    .pipe(reload( {stream: true} ));
});
