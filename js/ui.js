/* globals ANTLER, EventEmitter */

'use strict';

ANTLER.createUI = function(){
  var that = {};

  var events = new EventEmitter();
  that.addListener = function( event, fn ){
    events.addListener( event, fn );
  };

  return that;
};