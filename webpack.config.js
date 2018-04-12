'use strict';

let zlib = require('zlib');
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let CompressionPlugin = require("compression-webpack-plugin");
let webpack = require('webpack');

let fs = require('fs');

// workaround for suporting gzip level 9, see http://is.gd/FP9niA
let gzipMaxCompression = (buffer, done) => {
  return zlib.gzip(buffer, { level: 9 }, done);
};

module.exports = {
  mode: 'production',
  entry: {
    //app: ['./src/index.js', './src/fulkner/page.js', './src/fulkner/layout.js'],
    //vendor: ['./node_modules/mustache/mustache.js']
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      /*{
        from: './resources/space/',
        to: 'dist/[name].[hash].[ext]',
        test: /([^/]+)\/(.+)\.html/,
        force: true
      }*/
    ], { debug: 'warning' }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      exclude: [/\.min\.js$/gi]
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: gzipMaxCompression,
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],
};
