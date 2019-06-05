const path = require('path');
const publicPath = path.join(__dirname, 'client','public');

module.exports = {
  entry: './client/src',
  output: {
    filename: 'bundle.js',
    path: publicPath
  },
  mode: 'development',
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
}
