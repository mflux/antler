/* globals Engine */

'use strict';
Engine.createLogic = function(){
  var updateFunctions = [];
  var delta = null;
  var lastMsec = Date.now();
  (function updateLoop( nowMsec )
  {
    delta = nowMsec - lastMsec;

    for( var i=0; i<updateFunctions.length; i++ ){
      var update = updateFunctions[ i ];
      var fnDelta = nowMsec - update.lastTime;
      if( fnDelta > update.frequency ){
        update.fn( delta );
        update.lastTime = nowMsec;
      }
    }

    lastMsec = nowMsec;
    requestAnimationFrame( updateLoop );
  })( Date.now() );


  var that = {};
  that.add = function( fn, frequency ){
    if( frequency === undefined ){
      frequency = 0;
    }

    updateFunctions.push( {
      lastTime: 0,
      frequency: frequency,
      fn: fn
    });
  };

  return that;
};