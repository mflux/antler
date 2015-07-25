/* globals ANTLER, $, RES, Engine, THREE */

'use strict';

ANTLER.init = function( opts ){
  var resourceList = opts.resourceList;
  if( resourceList === undefined ){
    resourceList = [];
  }

  var app = opts.app;
  if( app === undefined ){
    app = ANTLER.sampleApp;
  }

  var renderSettings = opts.renderSettings;

  $( document ).ready( function(){
    setup({
      /* add url args here */
    });
  });

  function setup( urlArgs ){

    function main( resources ){
      var logic = Engine.createLogic();
      var view = Engine.createView( renderSettings );
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