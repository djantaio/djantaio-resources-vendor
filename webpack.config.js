'use strict';

let zlib = require('zlib');
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');

let fs = require('fs');
let config = require('./config');

// workaround for suporting gzip level 9, see http://is.gd/FP9niA
let gzipMaxCompression = (buffer, done) => {
  return zlib.gzip(buffer, { level: 9 }, done);
};

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: config.build.output
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|js)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          chunks: 'initial',
          name: 'bundle',
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
        commons: {
          test: /[\\/]assets[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: [
    new CopyWebpackPlugin(config.libraries, {})
  ]
};
