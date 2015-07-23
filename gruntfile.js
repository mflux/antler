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
        sourceMap: false
      },
      dist: {
        // the files to concatenate
        src: [

'js/vendor/jquery.min.js',
'js/vendor/jquery.mousewheel.min.js',
'js/vendor/Stats.js',
'js/vendor/EventEmitter.min.js',
'js/vendor/Stats.js',

//  Entity Component System
'js/vendor/ces-browser.min.js',
'js/vendor/signal.js',

//  DATGui
'js/vendor/dat.gui.min.js',

//  THREE.js
'js/vendor/three.min.js',

//  THREE.js PostProcessing
'js/vendor/postprocessing/additiveblend.js',
'js/vendor/postprocessing/BloomPass.js',
'js/vendor/postprocessing/BokehPass.js',
'js/vendor/postprocessing/BokehShader.js',
'js/vendor/postprocessing/ConvolutionShader.js',
'js/vendor/postprocessing/CopyShader.js',
'js/vendor/postprocessing/EffectComposer.js',
'js/vendor/postprocessing/FXAAShader.js',
'js/vendor/postprocessing/HorizontalBlurShader.js',
'js/vendor/postprocessing/MaskPass.js',
'js/vendor/postprocessing/RenderPass.js',
'js/vendor/postprocessing/ShaderDeferred.js',
'js/vendor/postprocessing/ShaderPass.js',
'js/vendor/postprocessing/SSAOShader.js',
'js/vendor/postprocessing/TexturePass.js',
'js/vendor/postprocessing/VerticalBlurShader.js',
'js/vendor/postprocessing/WebGLDeferredRenderer.js',

//  THREE extensions
'js/vendor/ObjectControls.js',
'js/vendor/OrbitControls.js',
'js/vendor/OBJLoader.js',
'js/vendor/threex.resize.js',

//  Tools
'js/tools/coordinates.js',
'js/tools/gup.js',
'js/tools/resource.js',

//  ANTLER namespace
'js/namespace.js',

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
'js/app.js',
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