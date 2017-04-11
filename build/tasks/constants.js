var gulp       = require('gulp'),
    ngConstant = require('gulp-ng-constant'),
    argv       = require('yargs').argv,
    paths      = require('../paths');

var environment = argv.db || 'local';

gulp.task('constants', function() {
  var configFile = require('../config.json');
  var envConfig = configFile[environment];
  return ngConstant({
    name: configFile.name,
    constants: envConfig,
    stream: true
  })
  .pipe(gulp.dest(paths.dest.output));
});
