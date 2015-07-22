/* globals VIS */

'use strict';

VIS.System = {};

VIS.System.setup = function( world ){
  var systems = {};
  for( var i in VIS.System ){
    if( i === 'setup' ){
      continue;
    }
    var SystemType = VIS.System[ i ];
    var system = new SystemType();
    world.addSystem( system );
    systems[ i ] = system;
  }
  return systems;
};