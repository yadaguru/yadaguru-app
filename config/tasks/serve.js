var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    paths       = require('../paths'),
    nodemon     = require('gulp-nodemon'),
    util        = require('gulp-util'),
    port        = process.env.PORT || 3000;

gulp.task('serve', function() {

  var isDev = true; // TODO: Make into arg

  var nodeOptions = {
    script: paths.serverRoot + 'server.js',
    delayTime: 1, // 1 second delay
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'prod'
    },
    watch: [paths.serverRoot + '**/*.*']
  };

  nodemon(nodeOptions)
    .on('restart', function(event) {
      log('*** nodemon restarted ***');
      log('Files changed on restart:\n' + event);
      setTimeout(function() {
        browserSync.notify('reloading now...');
        browserSync.reload({ stream: false });
      }, 1000);
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

function startBrowserSync() {
  if (browserSync.active) {
    return;
  }
  browserSync({
    proxy: 'localhost:' + port,
    open: false,
    port: 9000,
    files: paths.allClient,
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'warn',
    logPrefix: 'YadaApp',
    notify: true,
    reloadDelay: 1000
  });
}

function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        util.log(util.colors.blue(msg[item]));
      }
    }
  } else {
    util.log(util.colors.blue(msg));
  }
}
