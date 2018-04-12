'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('grunt-tasks'); // Load all grunt tasks (modules) in the grunt-tasks directory.

  grunt.registerTask('tasks', 'Lists available tasks', ['availabletasks']);

  grunt.registerTask('build', 'Build templating tasks', function() {
    grunt.task.run([
      //'htmlmin',
      'htmlConvert',
      'webpack' //execute webpack at last
    ]);
  });

  grunt.registerTask('development', 'Build templating development tasks', function(){
    process.env.NODE_ENV = 'development';
    process.env.USE_MINIFIED = true;

    if(grunt.option('skipTests')) {
      grunt.log.warn('--skipTests option not supported');
    }

    if(grunt.option('skipLint')) {
      grunt.log.warn('--skipLint option not supported');
    }

    grunt.task.run(['build']);
  });

  grunt.registerTask('production', 'Build templating production tasks', function(){
    process.env.NODE_ENV = 'production';
    process.env.USE_MINIFIED = true;

    grunt.task.run(['build']);
  });
};
