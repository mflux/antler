/* globals ANTLER, $, RES, Engine, THREE */

'use strict';

ANTLER.init = function( app, resourceList ){

  if( resourceList === undefined ){
    resourceList = [];
  }

  if( app === undefined ){
    app = ANTLER.sampleApp;
  }

  $( document ).ready( function(){
    setup({
      /* add url args here */
    });
  });

  function setup( urlArgs ){

    function main( resources ){
      var logic = Engine.createLogic();
      var view = Engine.createView( urlArgs );
      var control = Engine.createControl( view, logic );

      var ui = ANTLER.createUI();
      var world = ANTLER.createWorld({ view: view });

      app( world, view, control, logic, ui, resources, urlArgs );
    }

    RES.LoadResource( resourceList, main );
  }
};

ANTLER.sampleApp = function( world, view, control, logic, ui, resources, urlArgs ){
  var mesh = new THREE.Mesh( new THREE.BoxGeometry( 10,10,10 ), new THREE.MeshPhongMaterial() );
  world.addView( mesh );
};