var path = require('path');
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/dist');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target:'node',
  externals: [nodeExternals()],
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          'presets': ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
