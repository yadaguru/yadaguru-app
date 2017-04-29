var appRoot = 'src/';
var outputRoot = 'dist/';
var assetPath = appRoot + 'assets/';
var vendor = require('./vendor');

module.exports = {
  root: appRoot,
  src: {
    js: appRoot + '**/*.js', 
    html: appRoot + '**/*.html', 
    assets: assetPath + '**/*',
    scss: appRoot + 'styles/**/*.scss',
    vendor: vendor,
    requirejs: 'vendor/requirejs/require.js',
    images: 'images/*',
    html: appRoot + '**/*.html',
  },
  dest: {
    js: assetPath + 'js/',
    css: assetPath + 'css/',
    images: assetPath + 'images/',
    fonts: assetPath + 'fonts/',
    output: outputRoot,
  },
  sourceMapRelativePath: '../' + appRoot
};
