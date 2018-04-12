'use strict';

let config = require('../config');
let string = require('string');

//Normalizing the give file module name
let customize = (moduleName) => {
  console.log('About to rename file: %s', moduleName);
  return string(moduleName).trim()
    .chompRight('.mustache')
    .strip(' ', '_', '-')
    .replaceAll('/', '_')
    .replaceAll('.', '')
    .s;
};

/**
 * Mustache.js Template generator.
 *
 * CREDIT: https://github.com/soundstep/grunt-html-convert
 *
 * @param grunt
 */
module.exports = (grunt) => {
  grunt.config('htmlConvert', {
    options: {
      indentString:'',
      target: 'js',
      quoteChar: '\'',
      rename: customize,
      base: 'resources'
    },
    faulkner: {
      src: ['resources/faulkner/1.0.5/**/*.mustache'],
      dest: 'dist/templates/faulkner-1.0.5.js'
    }
  });
};
