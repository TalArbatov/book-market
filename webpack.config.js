const path = require('path');
const publicPath = path.join(__dirname, 'client','src');

module.exports = {
  entry: './client/src',
  output: {
    filename: 'bundle.js',
    path: publicPath
  },
  mode: 'developmnet',
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  }
}
