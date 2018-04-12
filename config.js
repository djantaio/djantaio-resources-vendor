'use strict';

module.exports = {
  build: {
    rootDir: 'build',
    release: 'dist',
    workDir: 'build/work',
    assets: 'dist/assets',
  },

  faulkner: {
    filter: {
      //'1.0.5': ['resources/faulkner/1.0.5/**/*.html', 'resources/faulkner/1.0.5/**/*.mustache']
      '1.0.5': ['resources/faulkner/1.0.5/**/*.mustache']
    }
  }
};
