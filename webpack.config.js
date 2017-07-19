var path = require('path');

module.exports = {
  entry: './lib/main.js',
  output: {
    filename: 'ez_dom.js',
    path: path.resolve(__dirname, 'lib')
  }
};
