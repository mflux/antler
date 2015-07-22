/* globals module*/
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: '\n',
        sourceMap: true
      },
      dist: {
        // the files to concatenate
        src: [

//  Vendor
'js/vendor/dat.gui.min.js',
'js/vendor/EventEmitter.min.js',
'js/vendor/signal.js',
'js/vendor/jquery-1.11.2.min.js',
'js/vendor/jquery.mousewheel.min.js',
'js/vendor/three.min.js',
'js/vendor/threexresize.js',
'js/vendor/Stats.js',
'js/vendor/OrbitControls.js',
'js/vendor/OBJLoader.js',
'js/vendor/seedrandom.min.js',
'js/vendor/ces-browser.min.js',
'js/vendor/Wagner/Wagner.js',
'js/vendor/Wagner/Wagner.base.js',

//  Tools
'js/tools/gup.js',
'js/tools/resource.js',

//  VIS namespace
'js/namespace.js',

//  Interface
'js/interface/namespace.js',

//  Engine
'js/engine/namespace.js',
'js/engine/control.js',
'js/engine/logic.js',
'js/engine/renderer.js',
'js/engine/view.js',

//  Components
'js/components/namespace.js',

//  Systems
'js/systems/namespace.js',


//  Client / Content
'js/ui.js',
'js/world.js',
'js/main.js'

        ],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    watch: {
      js: {
        files: [ 'gruntfile.js', 'js/**/*.js' ],
        tasks: [ 'dev' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');



  // Default task(s).
  grunt.registerTask('monitor', ['watch']);
  grunt.registerTask('dev', ['concat']);
  grunt.registerTask('default', ['concat']);

};