/* globals VIS, $, RES, Engine, getUrlParam */

'use strict';

$( document ).ready( function(){
  VIS.init({
    uidev: getUrlParam( 'uidev' ),
    loadcount: getUrlParam( 'loadcount' )
  });
});

VIS.init = function( urlArgs ){

  var resourceList = [
    'stardata/constellationnames.json'
  ];

  RES.LoadResource( resourceList, main );

  function main( resources ){
    var logic = Engine.createLogic();
    var ui = VIS.createUI();

    if( urlArgs.uidev ){
      $(document.body).css({
        backgroundImage: 'url("./assets/darkgraygrid.jpg")'
      });
      return;
    }

    var view = Engine.createView( urlArgs );
    var control = Engine.createControl( view, logic );

    VIS.createApp( view, control, logic, ui, resources, urlArgs );
  }
};

VIS.createApp = function( view, control, logic, ui, resources, urlArgs ){

};