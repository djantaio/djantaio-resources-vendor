'use strict';

let fs = require('fs');
let path = require('path');
let deps = require('./package.json').dependencies;
let _ = require('lodash');

let output = path.join(__dirname, 'distribution');

let defaults = {
  assets: path.join(output, 'assets'),
  output: output,
  module: path.join(__dirname, 'node_modules')
};

let isDirectory = (source) => source && fs.existsSync(source) && fs.statSync(source).isDirectory();
let isFile = (source) => source && fs.existsSync(source) && fs.statSync(source).isFile();

module.exports = {
  build: {
    rootDir: 'build',
    output: defaults.output,
    assets: defaults.assets
  },

  libraries: _.reduce(Object.keys(deps), (cumulator, name) => {
    let dir = path.join(defaults.module, name), file = path.join(dir, 'package.json');
    if (!_.isNil(cumulator) && isFile(file)) {
      try {
        let pkg = require(file), main = pkg.main;
        if (!_.isNil(main) && isFile(path.resolve(dir, main))) {
          cumulator.push({
            from: path.resolve(dir, main),
            to: path.join(defaults.assets, name, !_.isNil(pkg.version) ? pkg.version : '', '/')
          });
        }
      }
      catch (err) {
        console.error(err);
      }
    }
    return cumulator;
  }, [])
};
