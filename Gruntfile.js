module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jasmine : {
      library: {
        src: [
          'library/app/models/*.js',
          'library/app/collections/*.js',
          'library/app/helpers/*.js',
          'library/app/routers/*.js',
          'library/app/views/*.js',
          'library/app/main.js'
        ],
        options: {
          specs: 'test/spec/**/*.js',
          helpers: 'test/helpers/**/*.js',
          vendor: [
            'vendor/underscore-min.js',
            'vendor/jquery-2.1.3.min.js',
            'vendor/backbone-min.js',
            'vendor/backbone-validation-min.js',
            'vendor/bootstrap.min.js'
          ],
        }
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'app/**/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', 'uglify');

};