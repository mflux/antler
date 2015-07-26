/* globals TWEEN, Coordinates, THREE */
/* exported createViewControl */

'use strict';

var createViewControl = function( orbitControls, camera ){

  var panning = {
    x: 0
  };

  function setPan( offset ){
    var w = window.innerWidth;
    var h = window.innerHeight;
    camera.setViewOffset( w, h, offset, 0, w, h );
    camera.updateProjectionMatrix();
  }

  function panTo( offset, duration ){
    return new TWEEN.Tween( panning )
    .to({
      x: offset
    }, duration )
    .easing( TWEEN.Easing.Quadratic.InOut )
    .onUpdate( function(){
      setPan( panning.x );
    })
    .start();
  }

  function rotateTo( lat, long, duration ) {
    var curPhi, curTheta, ll, thetaDiff;
    var cameraDistance = camera.position.length();
    ll = Coordinates.toSpherical(lat, long, cameraDistance );
    lat = ll.lat;
    long = ll.long - ( Math.PI * 0.5 );
    curPhi = orbitControls.getPolarAngle();
    curTheta = -orbitControls.getAzimuthalAngle();
    thetaDiff = long - curTheta;
    while (thetaDiff > Math.PI) {
      thetaDiff -= Math.PI * 2;
    }
    while (thetaDiff < -Math.PI) {
      thetaDiff += Math.PI * 2;
    }
    long = curTheta + thetaDiff;

    var center = new THREE.Vector3();

    return new TWEEN.Tween({
      phi: curPhi,
      theta: curTheta
    })
    .to({
      phi: lat,
      theta: long
    }, duration )
    .easing( TWEEN.Easing.Quadratic.InOut )
    .onUpdate(function() {
      var xyz;
      this.theta += Math.PI / 2;
      xyz = Coordinates.sphericalToXYZ({
        radius: cameraDistance,
        lat: this.phi,
        long: this.theta
      });
      camera.position.set(xyz.x, xyz.y, xyz.z);
      camera.lookAt( center );
      return orbitControls.update();
    }).start();
  }

  var that = {};

  that.rotateTo = rotateTo;
  that.panTo = panTo;
  that.updateViewport = function(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    camera.setViewOffset( w, h, panning.x, 0, w, h );
    camera.updateProjectionMatrix();
  };

  that.getCameraLatLong = function( camera ){
    var lon = camera.rotation.x;
    var lat = camera.rotation.y;
    return {
      lat: lat,
      lon: lon
    };
  };

  return that;
};