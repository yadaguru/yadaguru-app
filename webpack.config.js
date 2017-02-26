var path = require('path');
module.exports = {
  output: {
    publicPath: '/dist/',
    filename: 'main.js'
  },
  resolve: {
    root: path.resolve(__dirname + '/src')
  }
};
