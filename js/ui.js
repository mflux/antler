/* globals VIS, EventEmitter */

'use strict';

VIS.createUI = function(){
  var that = {};

  var events = new EventEmitter();
  that.addListener = function( event, fn ){
    events.addListener( event, fn );
  };

  return that;
};