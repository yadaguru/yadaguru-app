var clientRoot = 'client/',
    serverRoot = 'server/',
    bowerPath  = clientRoot + 'vendor/';

module.exports = {
  clientRoot: clientRoot,
  serverRoot: serverRoot,
  allClient: [
    clientRoot + '**/*.js',
    clientRoot + '**/*.css',
    clientRoot + '**/*.html',
    !bowerPath
  ]
};
