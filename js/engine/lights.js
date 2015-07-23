/* globals Engine, THREE, R */

'use strict';
Engine.createLightSystem = function( view, options ){

  var count = options.count;
  var startIdx = view.registerLightGroup( count );

  var lightIdx = 0;
  function clearLights(){
    lightIdx = 0;
    view.clearLightRange( startIdx, count );
  }

  function addLight( p ){
    var light = view.setLight( startIdx + lightIdx, p );
    lightIdx++;
    if( lightIdx >= count ){
      lightIdx = 0;
    }
    return light;
  }

  function addMultiple( lights ){
    lights.forEach( function( p ){
      addLight( p );
    });
  }


  var that = {};

  that.clear = clearLights;
  that.add = addLight;
  that.addMultiple = addMultiple;
  return that;
};