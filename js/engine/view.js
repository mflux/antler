/**
 * View
 *  takes in url arguments
 *  generates a scene, camera, and a renderer (see engine/renderer.js)
 *  establishes a draw loop on requestAnimationFrame
 *  outputs the following public functions
 *    getRenderer() - gets the three.js renderer itself
 *    getSpace() - gets the group which to add scene graph objects to
 *    getCamera() - gets the camera
 *    getDomElement() - gets the dom element from the renderer
 */

/* globals Engine, THREE, $ */

'use strict';

Engine.createView = function( /* options */ ){

  var renderWidth = window.innerWidth;
  var renderHeight = window.innerHeight;

  var camera = new THREE.PerspectiveCamera( 20, renderWidth/renderHeight, 0.25, 4000 );
  camera.position.set( 1, 1, 1 );
  // camera.position.normalize().multiplyScalar( 500 );

  var scene = new THREE.Scene();
  scene.add( camera );

  var renderer = Engine.createRenderer( camera, scene );
  $( '#render' ).append( $( renderer.getDomElement() ) );

  //  a group that's Z-Up, add everything to this
  var space = new THREE.Group();
  scene.add( space );
  space.rotation.x = Math.PI * 0.5;

  var zoomCenter = new THREE.Vector3();

  var clock = new THREE.Clock( true );

  function render( delta, zoomCenter ){
    renderer.render( delta, zoomCenter );
  }

  (function drawLoop()
  {

    var delta = clock.getDelta();

    scene.traverse( function( o ){
      if( o.update ){
        if( o instanceof THREE.LOD ){
          o.update( camera );
        }
        else{
          o.update( delta, camera );
        }
      }
    });

    render( delta, zoomCenter );

    requestAnimationFrame( drawLoop );

  })( Date.now() );


  //  public accessors...

  var that = {};

  that.getRenderer = function(){
    return renderer;
  };

  that.getSpace = function(){
    return space;
  };

  that.getScene = function(){
    return scene;
  };

  that.getCamera = function(){
    return camera;
  };

  that.getDomElement = function(){
    return renderer.getDomElement();
  };

  that.setZoomCenter = function( zc ){
    zoomCenter.copy( zc );
  };

  that.setFov = function( fov ){
    camera.fov = fov;
    camera.updateProjectionMatrix();
  };

  return that;
};