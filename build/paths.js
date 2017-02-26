var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: [appRoot + '**/*.html', 'index.html'],
  scss: appRoot + 'styles/**/*.scss',
  output: outputRoot,
  sourceMapRelativePath: '../' + appRoot,
  buildAssets: 'build/assets/'
  // Recommended structure for tests: e2eSpecsSrc: 'test/e2e/src/*.js'
  // Recommended structure for tests: e2eSpecsDist: 'test/e2e/dist/'
};
