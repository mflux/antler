/* globals VIS, CES */

'use strict';

VIS.createWorld = function( params ){
  var view = params.view;

  var that = new CES.World();

  var space = view.getSpace();
  that.addView = function( obj ){
    space.add( obj );
  };

  return that;
};