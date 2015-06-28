module.exports = function() {
  var clientPath     = './yadaApp/',
      serverPath     = './server/',
      serverApp      = './server.js',
      buildPath      = './build/',
      clientTemp     = clientPath + '.tmp/',
      bowerPath      = clientPath + 'bower_components/';

  var config = {
    
    defaultPort: 3000,
    /**
     * Generic Paths
     */
    // clientTemporary folder
    clientTemp: clientTemp,
    // Angular app root
    clientPath: clientPath,
    buildPath: buildPath,

    /**
     * Server Files
     */
    serverPath: serverPath,
    serverApp: serverApp,

    /**
     * Client Files
     */
    // All js files
    alljs: [
      './*.js', // Root server folder JS
      clientPath + '**/*.js', // Angular app root and sub
      serverPath,
      '!' + bowerPath + '/**'
    ],
    htmlTemplates: clientPath + '**/*.html',
    index: clientPath + 'index.html',
    fonts: bowerPath + 'font-awesome/fonts/**',
    images: clientPath + 'images/**/*.*',
    clientAssets: [
      clientPath + '**/*.js', // Angular app root and sub
      clientPath + '**/*.css',
      '!' + bowerPath + '/**'
    ],

    /**
     * Bower
     */
    bower: {
      json: './bower.json',
      directory: bowerPath,
      ignorePath: 'yadaApp/'
    },

    /**
     * Browser Sync
     */
    browserReloadDelay: 1000
  };

  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
