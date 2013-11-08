module.exports = function(grunt) {
  grunt.initConfig({
    
    clean: ['dist'],

    connect: {
      options: {
        port: process.env.PORT || 3131,
        base: './',
      },

      all: {},
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: 'index.html',
      },
      js: {
        files: '*.js',
      },
      assets: {
        files: ['*.css', '*.js', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
      }
    },
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  
  grunt.registerTask('server', ['connect', 'watch']);

  grunt.registerTask('deploy', ['default', 'gh-pages']);

};
