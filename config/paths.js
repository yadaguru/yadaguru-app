var clientRoot = 'client/',
    serverRoot = 'server/',
    cssRoot = clientRoot + 'css/';
    bowerPath  = clientRoot + 'vendor/';

module.exports = {
  clientRoot: clientRoot,
  serverRoot: serverRoot,
  cssRoot: cssRoot,
  allClient: [
    clientRoot + '**/*.js',
    clientRoot + '**/*.css',
    clientRoot + '**/*.html',
    !bowerPath
  ]
};
