/* globals Engine, THREE, WAGNER */

'use strict';

Engine.createRenderer = function( camera, scene ){

  var renderWidth = window.innerWidth;
  var renderHeight = window.innerHeight;

  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize( renderWidth, renderHeight );

  //  take care of window resizing




  var effectParams = {
    bloomEnabled     : true,
    applyZoomBlur    : true,
    blurAmount       : 0.18,
    zoomBlurStrength : 0.26
  };

  WAGNER.vertexShadersPath   = 'js/vendor/Wagner/vertex-shaders';
  WAGNER.fragmentShadersPath = 'js/vendor/Wagner/fragment-shaders';
  WAGNER.assetsPath          = 'js/vendor/Wagner/assets/';

  var composer = new WAGNER.Composer( renderer, {
    useRGBA : false
  });

  composer.setSize( renderer.domElement.width, renderer.domElement.height );


  var bloomPass = new WAGNER.MultiPassBloomPass();
  bloomPass.params.blurAmount = 0.22;
  bloomPass.params.applyZoomBlur = true;
  bloomPass.params.zoomBlurStrength = 0.15;



  window.addEventListener( 'resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize(renderer.domElement.width, renderer.domElement.height);

  }, false );




  function updatePostProcessing( zoomCenter ){
    bloomPass.params.bloomEnabled     = effectParams.bloomEnabled;
    bloomPass.params.applyZoomBlur    = effectParams.applyZoomBlur;
    bloomPass.params.blurAmount       = effectParams.blurAmount;
    bloomPass.params.zoomBlurStrength = effectParams.zoomBlurStrength;
    bloomPass.params.zoomCenter       = zoomCenter;
  }



  var that = {};

  that.getDomElement = function(){
    return renderer.domElement;
  };

  that.render = function( delta, zoomCenter ){
    updatePostProcessing( zoomCenter );
    composer.reset();
    composer.render( scene, camera );
    if( effectParams.bloomEnabled ){
      composer.pass( bloomPass );
    }
    composer.toScreen();
  };

  return that;
};