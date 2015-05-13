var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest'),
    gutil = require('gulp-util'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

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

gulp.task('test', function() {
  env({vars: {ENV:'TEST'}});
  gulp.src('test/*.js', {read: false})
      .pipe(gulpMocha({reporter: 'spec'}))
});

gulp.task('up', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3000
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function() {
    console.log('Restarting');
  })
});
