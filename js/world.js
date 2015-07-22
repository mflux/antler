/* globals VIS, CES */

'use strict';

VIS.createWorld = function( params ){
  var view = params.view;

  var that = new CES.World();

  that.getView = function(){
    return view;
  };

  var space = view.getSpace();
  that.addView = function( obj ){
    space.add( obj );
  };

  var glow = view.getGlowSpace();
  that.addGlow = function( obj ){
    glow.add( obj );
  };

  return that;
};