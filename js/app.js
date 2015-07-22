/* globals ANTLER, THREE */

'use strict';
ANTLER.createApp = function( world, view, control, logic, ui, resources, urlArgs ){
  var mesh = new THREE.Mesh( new THREE.BoxGeometry( 10,10,10 ), new THREE.MeshPhongMaterial() );
  world.addView( mesh );
};