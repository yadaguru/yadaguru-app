var appRoot = 'src/';
var outputRoot = 'dist/';
var assetPath = appRoot + 'assets/';
var vendor = require('./vendor');

module.exports = {
  root: appRoot,
  source: [
    appRoot + '**/*.js', 
    appRoot + '**/*.html', 
    assetPath + '**/*',
  ],
  vendor: vendor,
  assetPath: assetPath,
  assets: {
    js: assetPath + 'js/',
    css: assetPath + 'css/',
    images: assetPath + 'images/',
    fonts: assetPath + 'fonts/',
  },
  requirejs: 'vendor/requirejs/require.js',
  images: 'images/*',
  html: [appRoot + '**/*.html', 'index.html'],
  scss: appRoot + 'styles/**/*.scss',
  output: outputRoot,
  sourceMapRelativePath: '../' + appRoot
  // Recommended structure for tests: e2eSpecsSrc: 'test/e2e/src/*.js'
  // Recommended structure for tests: e2eSpecsDist: 'test/e2e/dist/'
};
