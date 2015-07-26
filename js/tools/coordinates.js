/* globals THREE */
/* exported Coordinates */

'use strict';
var Coordinates = (function(){
  var toDeg = 180 / Math.PI;
  var toRad = Math.PI / 180;

  return {
    degToRad: function( d ){
      return d * toRad;
    },

    radToDeg: function( rad ){
      return rad * toDeg;
    },

    toRadians: function( lat, lon ){
      return {
        lat: Coordinates.degToRad( -lat ) + Math.PI * 0.5,
        lon: Coordinates.degToRad( -lon ) + Math.PI * 0.5
      };
    },

    toSpherical: function( lat, lon, r ){
      var ll = Coordinates.toRadians( lat, lon );
      return {
        lat: ll.lat,
        lon: ll.lon,
        radius: r
      };
    },

    XYZToSpherical: function( x, y, z ){
      var r = Math.sqrt( x * x + y * y + z * z );
      var lat = Coordinates.radToDeg( Math.asin( y / r ) );
      var lon = Coordinates.radToDeg( Math.atan2( z, x ) );
      return {
        lat: lat,
        lon: lon
      };
    },

    sphericalToXYZ: function( spherical ){
      return {
        x: spherical.radius * Math.cos(spherical.lon) * Math.sin(spherical.lat),
        y: spherical.radius * Math.cos(spherical.lat),
        z: spherical.radius * Math.sin(spherical.lon) * Math.sin(spherical.lat)
      };
    },

    latLonToXYZ: function( lat, lon, radius ){
      return Coordinates.sphericalToXYZ( Coordinates.toSpherical( lat, lon, radius ) );
    },

    latLonToVector3: function( lat, lon, radius ){
      var xyz = Coordinates.latLonToXYZ( lat, lon, radius );
      return new THREE.Vector3( xyz.x, xyz.y, xyz.z );
    }
  };
}());