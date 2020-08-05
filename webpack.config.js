let path = require('path');
let webpack = require('webpack');

module.exports = {
  watch: true,
  entry: {
    'animejs-facade': './src/js/animejs-facade.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].min.js'
  }
};