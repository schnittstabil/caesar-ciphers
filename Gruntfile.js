'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jsdoc: {
      dist: {
        src: ['lib/*.js', 'test/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      bin: {
        src: ['bin/**/*.js']
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      bin: {
        files: '<%= jshint.bin.src %>',
        tasks: ['jshint:bin', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
    githooks: {
      all: {
        // Will run the jshint and test:unit tasks at every commit
        'pre-commit': 'default'
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jsdoc');

  // Alias tasks.
  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('doc', ['jsdoc']);

  // Default task.
  grunt.registerTask('default', ['lint', 'test', 'doc']);

};
