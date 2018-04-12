'use strict';

let config = require('../config');
let path = require('path');

module.exports = (grunt) => {
  grunt.config('htmlmin', {
    faulkner: {
      options: {
        removeComments: false,
        collapseWhitespace: false
      },
      files: [{
        expand: true,
        //cwd: path.resolve(__dirname, '..'),
        src: config.faulkner.filter['1.0.5'],
        dest: config.build.rootDir
      }]
      //src: ['resources/faulkner/1.0.5/**/*.mustache'],
      //dest: 'dist/templates/faulkner-1.0.5.js'
    }
  });
};
