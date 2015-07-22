/* globals VIS, EventEmitter, Interface, $ */

'use strict';

VIS.createUI = function(){
  var that = {};

  var events = new EventEmitter();
  that.addListener = function( event, fn ){
    events.addListener( event, fn );
  };

  $( '#homescreen' ).on( 'mousedown click', function( e ){
    e.preventDefault();
  });

  return that;
};