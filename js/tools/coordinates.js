/* globals THREE */
/* exported Coordinates */

'use strict';
var Coordinates = (function(){
  var toDeg = 180 * Math.PI;
  var toRad = Math.PI / 180;

  return {
    degToRad: function( d ){
      return d * toRad;
    },

    radToDeg: function( rad ){
      return rad * toDeg;
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

    XYZToSpherical: function( x, y, z ){
      var r = Math.sqrt( x * x + y * y + z * z );
      var lat = Coordinates.radToDeg( Math.asin( z / r ) );
      var lon = Coordinates.radToDeg( Math.atan2( y, x ) );
      return {
        lat: lat,
        lon: lon
      };
    },

    sphericalToXYZ: function( spherical ){
      return {
        x: spherical.radius * Math.cos(spherical.long) * Math.sin(spherical.lat),
        y: spherical.radius * Math.cos(spherical.lat),
        z: spherical.radius * Math.sin(spherical.long) * Math.sin(spherical.lat)
      };
    },

    latLonToXYZ: function( lat, long, radius ){
      return Coordinates.sphericalToXYZ( Coordinates.toSpherical( lat, long, radius ) );
    },

    latLonToVector3: function( lat, long, radius ){
      var xyz = Coordinates.latLonToXYZ( lat, long, radius );
      return new THREE.Vector3( xyz.x, xyz.y, xyz.z );
    }
  };
}());