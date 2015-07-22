/* globals VIS, $, RES, Engine, getUrlParam */

'use strict';

$( document ).ready( function(){
  VIS.init({
    /* add url args here */
  });
});

VIS.init = function( urlArgs ){

  var resourceList = [
  ];

  RES.LoadResource( resourceList, main );

  function main( resources ){
    var logic = Engine.createLogic();
    var view = Engine.createView( urlArgs );
    var control = Engine.createControl( view, logic );

    var ui = VIS.createUI();
    var world = VIS.createWorld({ view: view });

    VIS.createApp( world, view, control, logic, ui, resources, urlArgs );
  }
};