'use strict';

module.exports = function(grunt) {
  // Report the elapsed execution time of tasks.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>+<%= grunt.template.today("yymmddHH") %>',
      license: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
      copyright: 'Copyright (c) 2014-<%= grunt.template.today("yyyy") %>, ' +
        '<%= pkg.author.name %> <<%= pkg.author.email %>>',
      banner:
        '/*!\n' +
        ' * caesar-ciphers - v<%= meta.version %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * <%= pkg.description %>\n' +
        ' *\n' +
        ' * <%= meta.copyright %>\n' +
        ' * Licensed under the <%= meta.license %> License.\n' +
        ' */\n\n' +
        '/**\n' +
        ' * @license <%= meta.license %>\n' +
        ' */\n\n'
    },
    clean: {
      dist: {
        src: ['<%= pkg.directories.dist %>']
      },
      doc: {
        src: ['<%= pkg.directories.dist %>/doc']
      },
    },
    requirejs: {
      compile: {
        options: {
          name: '../node_modules/almond/almond',
          optimize: 'none',
          // optimize: 'uglify2',
          // generateSourceMaps: true,
          // preserveLicenseComments: false,
          out: './dist/caesar-ciphers.min.js',
          addDir: './lib',
          baseUrl: './lib',
          mainConfigFile: './requirejs-config.js',
          include: ['caesar-ciphers'],
        },
      },
      // 'compile-test': {
      //   options: {
      //     name: './node_modules/almond/almond',
      //     optimize: 'none',
      //     out: './dist/caesar-ciphers_tests.js',
      //     addDir: './lib',
      //     baseUrl: './',
      //     mainConfigFile: './requirejs-config.js',
      //     include: ['./test/mocha-browser']
      //   },
      // },
    },
    mochaTest: {
      bin: {
        options: {
          reporter: 'dot',
        },
        src: ['test/bin/**/*_test.js', '!test/**/*_slow_test.js']
      },
      lib: {
        options: {
          reporter: 'dot',
        },
        src: ['test/lib/*_test.js', '!test/**/*_slow_test.js']
      },
      slow: {
        options: {
          reporter: 'dot',
        },
        src: ['test/**/*_slow_test.js']
      },
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'lib/',
          outdir: '<%= pkg.directories.dist %>/doc/api',
        },
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
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
        options: {
          jshintrc: 'test/.jshintrc',
        },
        src: ['test/**/*.js', '!test/bower_components/**']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['test']
      },
      bin: {
        files: '<%= jshint.bin.src %>',
        tasks: ['test']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['test']
      },
      doc: {
        files: ['<%= jshint.bin.src %>',
                '<%= jshint.lib.src %>',
                '<%= jshint.test.src %>'],
        tasks: ['yuidoc']
      }
    },
    githooks: {
      all: {
        // Will run the jshint and test tasks at every commit
        'pre-commit': 'default'
      }
    },
  });

  // load grunt tasks
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0){
      grunt.loadNpmTasks(key);
    }
  }

  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.registerTask('doc', function(){
    if(!grunt.file.exists('./node_modules/grunt-contrib-yuidoc')){
      grunt.log.error(
        'Install Npm module first:\n'+
        '\tnpm install grunt-contrib-yuidoc'
      );
    }else{
      grunt.task.run(['clean:doc', 'yuidoc']);
    }
  });

  // Alias tasks.
  grunt.registerTask('dist', ['clean', 'requirejs']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['mochaTest:lib']);
  grunt.registerTask('testall', ['mochaTest']);

  // Default task.
  grunt.registerTask('default', ['lint', 'testall', 'dist']);

};
