'use strict';

let config = require('../config');
let webpackConfig = require('../webpack.config.js');

module.exports = (grunt) => {
  grunt.config('webpack', {
    options: {
      stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    },
    all: Object.assign({ watch: false }, webpackConfig)
  });
};
