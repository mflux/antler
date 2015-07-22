/* globals Engine, THREE */

'use strict';

Engine.createControl = function( view, logic ){
  var camera = view.getCamera();
  var domElement = view.getDomElement();

  var orbitControls = new THREE.OrbitControls( camera, domElement );
  orbitControls.target.set( 0, 0, 0 );

  //  values for debug only
  orbitControls.noPan = true;
  orbitControls.userPanSpeed = 0.3;
  orbitControls.keyPanSpeed = 30.0;

  orbitControls.noZoom = true;
  orbitControls.zoomSpeed = 4.0;

  orbitControls.update();

  var that = {};

  // expose some control-related stuff

  that.getOrbitControls = function(){
    return orbitControls;
  };

  logic.add( function(){
    orbitControls.update();
  });

  return that;
};