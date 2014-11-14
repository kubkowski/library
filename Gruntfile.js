module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jasmine : {
      library: {
        src: 'library/app/**/*.js',
        options: {
          specs: 'test/spec/**/*.js',
          helpers: 'test/helpers/**/*.js'
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