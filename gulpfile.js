/* global process */
var gulp        = require('gulp'),
    args        = require('yargs').argv,
    browserSync = require('browser-sync'),
    config      = require('./gulp.config')(),
    del         = require('del'),
    wiredep     = require('wiredep').stream,
    $           = require('gulp-load-plugins')({ lazy : true }),
    port        = process.env.PORT || config.defaultPort;

// Default and Task both display a list of tasks
// TODO: Add more details to help
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

// Lints the code
// TODO: Add a watcher
gulp.task('lint', function() {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('fonts', ['clean-fonts'], function() {
  log('Copying fonts to build path');
  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.buildPath + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
  log('Copying and compressing images to build path');
  return gulp
    .src(config.images)
    .pipe($.imagemin({ optimizationLevel: 4 }))
    .pipe(gulp.dest(config.buildPath + 'images'));
});

gulp.task('clean', function(done) {
  var delconfig = [].concat(config.buildPath, config.clientTemp);
  log('Cleaning: ' + $.utils.colors.blue(delconfig));
  del(delconfig, done);
});

gulp.task('clean-fonts', function(done) {
  clean(config.buildPath + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function(done) {
  clean(config.buildPath + 'images/**/*.*', done);
});

gulp.task('clean-code', function(done) {
  var files = [].concat(
    config.clientTemp + '**/*.js',
    config.build + '**/*.html',
    config.build + '**/*.js'
    );
  clean(files, done);
});

gulp.task('wiredep', function() {
  log('Wiring up the bower css and js into the html');
  var options = config.getWiredepDefaultOptions();
  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe(gulp.dest(config.clientPath));
});

gulp.task('inject', ['wiredep'], function() {
  log('Wiring up the app css and js into the html');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.clientAssets), {
      addRootSlash: false,
      ignorePath: 'yadaApp'
    }))
    .pipe(gulp.dest(config.clientPath));
});

gulp.task('serve-dev', ['inject'], function() {
  var isDev = true; // TODO: Make into arg

  var nodeOptions = {
    script: config.serverApp,
    delayTime: 1, // 1 second delay
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'prod'
    },
    watch: [config.serverPath + '**/*.*']
  };

  return $.nodemon(nodeOptions)
    .on('restart', function(event) {
      log('*** nodemon restarted ***');
      log('Files changed on restart:\n' + event);
      setTimeout(function() {
        browserSync.notify('reloading now...');
        browserSync.reload({ stream: false });
      }, config.browserReloadDelay);
    })
    .on('start', function() {
      log('*** nodemon started ***');
      startBrowserSync();
    })
    .on('crash', function() {
      log('*** nodemon crashed ***');
    })
    .on('exit', function() {
      log('*** nodemon exited cleanly ***');
    });
});

// TODO: Rewrite for output to a Build
// Unminified is OK for dev
gulp.task('minifyCSS', function() {
  return gulp.src('./yadaApp/css/main.css')
    .pipe($.minifyCss())
    .pipe($.rename({ extname : '.min.css'} ))
    .pipe(gulp.dest('./yadaApp/css/'))
    .pipe($.reload( {stream: true} ));
});

//========== Helper Methods ==========
function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}

function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
  if (args.nosync || browserSync.active) {
    return;
  }
  log('Starting browser-sync on port ' + port);

  var options = {
    proxy: 'localhost:' + port,
    port: 9000,
    files: [
      config.clienPath + '**/*.*',
      '!' + config.less
      ],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'obleydotnet',
    notify: true,
    reloadDelay: 1000
  };

  browserSync(options);
}