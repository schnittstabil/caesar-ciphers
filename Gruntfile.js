'use strict';

module.exports = function(grunt) {
  // Report the elapsed execution time of tasks.
  require('time-grunt')(grunt);

  // webpack config
  var path = require('path'),
    webpack = require('webpack'),
    webpackConfig = {
      cache: true,
      context: '<%= deamdefine.dest %>',
      output: {
        library : 'caesarCiphers',
        path: path.join(__dirname, 'dist', 'webpacked'),
        publicPath: 'dist/',
        filename: '[name].js',
        chunkFilename: '[id].js'
      },
      devtool: '#sourcemap',
      plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin(
          '<%= meta.banner %>', { entryOnly: false, raw: true }
        ),
      ],
    };

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
      build: {
        src: ['<%= pkg.directories.dist %>', '<%= pkg.directories.doc %>']
      }
    },
    mochaTest: {
      bin: {
        options: {
          reporter: 'dot',
        },
        src: ['test/bin/**/*_test.js']
      },
      lib: {
        options: {
          reporter: 'dot',
        },
        src: ['test/lib/*_test.js']
      },
    },
    jscover: {
      options: {
        inputDirectory: 'lib',
        outputDirectory: 'lib-cov',
      }
    },
    jsdoc: {
      dist: {
        src: ['lib/*.js'],
        options: {
          destination: '<%= pkg.directories.doc %>/api'
        }
      }
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
        src: ['test/**/*.js']
      },
    },
    deamdefine:{
      dest: 'dist/deamdefined',
      process: function(content) {
        /* jshint -W101 */
        return content.replace(
          /if\s*\(\s*typeof define\s*\!==\s*'function'\s*\)\s*\{\s*[^\{\}]+amdefine[^\{\}]+\}\s*/g,
          ''
          );
        /* jshint +W101 */
      },
    },
    copy:{
      deamdefineLib: {
        expand: true,
        src: 'lib/**',
        dest: '<%= deamdefine.dest %>',
        options: {
          process: '<%= deamdefine.process %>',
        },
      },
      deamdefineTest: {
        expand: true,
        src: 'test/**',
        dest: '<%= deamdefine.dest %>',
        options: {
          process: '<%= deamdefine.process %>',
        },
      },
    },
    webpack: {
      options: webpackConfig,
      build: {
        entry: {
          'caesar-ciphers': './lib/index.js',
        },
      },
      test: {
        entry: {
          'caesar-ciphers_tests': './test/lib/caesar-ciphers_test.js',
        },
        debug: true,
      },
    },
    'webpack-dev-server': {
      options: {
        webpack: webpackConfig,
        publicPath: '/' + webpackConfig.output.publicPath,
        debug: true,
      },
      start: {
        webpack: {
          entry: {
            'caesar-ciphers_tests': './test/lib/caesar-ciphers_test.js',
          },
        },
        keepAlive: true,
        contentBase: './public',
        stats: {
          colors: true
        },
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['doc', 'test']
      },
      bin: {
        files: '<%= jshint.bin.src %>',
        tasks: ['doc', 'test']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['doc', 'test']
      },
      doc: {
        files: ['<%= jshint.bin.src %>',
                '<%= jshint.lib.src %>',
                '<%= jshint.test.src %>'],
        tasks: ['doc']
      }
    },
    githooks: {
      all: {
        // Will run the jshint and test:unit tasks at every commit
        'pre-commit': 'default'
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jscover');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-webpack');

  // Alias tasks.
  grunt.registerTask('code-coverage', ['jscover']);
  grunt.registerTask(
    'deamdefine',
    ['copy:deamdefineLib', 'copy:deamdefineTest']
  );
  grunt.registerTask(
    'dev-server',
    ['clean', 'deamdefine', 'webpack-dev-server']
  );
  grunt.registerTask('dist', ['clean', 'deamdefine', 'webpack:build']);
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['mochaTest:lib']);
  grunt.registerTask('testall', ['mochaTest']);

  grunt.registerTask('docall', ['jsdoc', 'code-coverage']);

  // Default task.
  grunt.registerTask('default', ['testall', 'dist', 'lint', 'doc']);

};
