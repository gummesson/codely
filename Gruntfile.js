module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var projectConfig = {
    assets: {
      vendor: {
        src: 'assets/vendor'
      },

      sass: {
        src: 'assets/sass',
        build: 'temp',
        dest: 'public/assets/css'
      },

      haml: {
        src: 'assets/haml',
        dest: 'public'
      },

      js: {
        src: 'lib',
        build: 'temp',
        dest: 'public/assets/js'
      },

      img: {
        src: 'assets/img',
        dest: 'public/assets/img'
      }
    }
  };

  grunt.initConfig({
    vendorFiles: projectConfig.assets.vendor,
    sassFiles: projectConfig.assets.sass,
    hamlFiles: projectConfig.assets.haml,
    jsFiles: projectConfig.assets.js,
    imgFiles: projectConfig.assets.img,

    sass: {
      build: {
        options: {
          style: 'compressed'
        },

        files: {
          '<%= sassFiles.build %>/style.css': [
            '<%= sassFiles.src %>/style.scss'
          ]
        }
      }
    },

    haml: {
      dist: {
        files: {
          '<%= hamlFiles.dest %>/index.html': [
            '<%= hamlFiles.src %>/index.haml'
          ]
        }
      }
    },

    concat: {
      js: {
        src: [
          '<%= jsFiles.src %>/intro.js',
          '<%= jsFiles.src %>/globals.js',
          '<%= jsFiles.src %>/utils.js',
          '<%= jsFiles.src %>/storage.js',
          '<%= jsFiles.src %>/notifications.js',
          '<%= jsFiles.src %>/editor.js',
          '<%= jsFiles.src %>/init.js',
          '<%= jsFiles.src %>/outro.js'
        ],
        dest: '<%= jsFiles.build %>/app.js',
        nonull: true
      }
    },

    jshint: {
      files: [
        'Gruntfile.js',
        '<%= jsFiles.build %>/*.js'
      ],
      options: {
        newcap: false
      }
    },

    uglify: {
      build: {
        files: {
          '<%= jsFiles.dest %>/app.js': [
            '<%= vendorFiles.src %>/codemirror/lib/codemirror.js',
            '<%= vendorFiles.src %>/codemirror/addon/display/fullscreen.js',
            '<%= vendorFiles.src %>/codemirror/addon/edit/closebrackets.js',
            '<%= vendorFiles.src %>/codemirror/addon/edit/closetag.js',
            '<%= vendorFiles.src %>/codemirror/keymap/vim.js',
            '<%= vendorFiles.src %>/codemirror/keymap/emacs.js',
            '<%= vendorFiles.src %>/codemirror/mode/xml/xml.js',
            '<%= vendorFiles.src %>/codemirror/mode/css/css.js',
            '<%= vendorFiles.src %>/codemirror/mode/javascript/javascript.js',
            '<%= vendorFiles.src %>/codemirror/mode/htmlmixed/htmlmixed.js',
            '<%= vendorFiles.src %>/codemirror/mode/haml/haml.js',
            '<%= vendorFiles.src %>/codemirror/mode/jade/jade.js',
            '<%= vendorFiles.src %>/codemirror/mode/sass/sass.js',
            '<%= vendorFiles.src %>/codemirror/mode/less/less.js',
            '<%= vendorFiles.src %>/codemirror/mode/coffeescript/coffeescript.js',
            '<%= vendorFiles.src %>/codemirror/mode/ruby/ruby.js',
            '<%= vendorFiles.src %>/codemirror/mode/python/python.js',
            '<%= vendorFiles.src %>/codemirror/mode/markdown/markdown.js',
            '<%= vendorFiles.src %>/emmet/emmet.js',
            '<%= jsFiles.build %>/app.js'
          ]
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          '<%= sassFiles.dest %>/style.css': [
            '<%= sassFiles.build %>/style.css',
            '<%= vendorFiles.src %>/codemirror/lib/codemirror.css',
            '<%= vendorFiles.src %>/codemirror/addon/display/fullscreen.css',
            '<%= vendorFiles.src %>/codemirror/theme/paraiso-dark.css'
          ]
        }
      }
    },

    watch: {
      sass: {
        files: '<%= sassFiles.src %>/*.scss',
        tasks: ['sass', 'cssmin']
      },

      haml: {
        files: '<%= hamlFiles.src %>/*.haml',
        tasks: ['haml']
      },

      js: {
        files: ['Gruntfile.js', '<%= jsFiles.src %>/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    copy: {
      img: {
        files: [{
          expand: true,
          cwd:'<%= imgFiles.src %>',
          src: ['**'],
          dest: '<%= imgFiles.dest %>'
        }]
      },

      site: {
        files: [{
          expand: true,
          cwd:'public/',
          src: ['**'],
          dest: '../gh-pages/'
        }]
      }
    }
  });

  grunt.registerTask('default', ['ui', 'js']);
  grunt.registerTask('ui', ['sass:build', 'cssmin', 'haml', 'copy:img']);
  grunt.registerTask('js', ['concat', 'jshint', 'uglify']);
  grunt.registerTask('build', ['ui', 'js', 'copy:site']);
  grunt.registerTask('dev', ['ui', 'js', 'watch']);

};
