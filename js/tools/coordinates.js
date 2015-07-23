/* globals THREE */
/* exported Coordinates */

'use strict';
var Coordinates = {
  degToRad: function( d ){
    return d / 180 * Math.PI;
  },

  toRadians: function( lat, long ){
    return {
      lat: Coordinates.degToRad( -lat ) + Math.PI * 0.5,
      long: Coordinates.degToRad( -long ) + Math.PI * 0.5
    };
  },

  toSpherical: function( lat, long, r ){
    var ll = Coordinates.toRadians( lat, long );
    return {
      lat: ll.lat,
      long: ll.long,
      radius: r
    };
  },

  sphericalToXYZ: function( spherical ){
    return {
      x: spherical.radius * Math.cos(spherical.long) * Math.sin(spherical.lat),
      y: spherical.radius * Math.cos(spherical.lat),
      z: spherical.radius * Math.sin(spherical.long) * Math.sin(spherical.lat)
    };
  },

  latLongToXYZ: function( lat, long, radius ){
    return Coordinates.sphericalToXYZ( Coordinates.toSpherical( lat, long, radius ) );
  },

  latLongToVector3: function( lat, long, radius ){
    var xyz = Coordinates.latLongToXYZ( lat, long, radius );
    return new THREE.Vector3( xyz.x, xyz.y, xyz.z );
  }
};