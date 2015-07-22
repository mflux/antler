/* globals ANTLER */

'use strict';

ANTLER.System = {};

ANTLER.System.setup = function( world ){
  var systems = {};
  for( var i in ANTLER.System ){
    if( i === 'setup' ){
      continue;
    }
    var SystemType = ANTLER.System[ i ];
    var system = new SystemType();
    world.addSystem( system );
    systems[ i ] = system;
  }
  return systems;
};