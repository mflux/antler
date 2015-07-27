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

  function rotateTo( lat, lon, idealDist, duration, autoStart ) {
    if( autoStart === undefined ){
      autoStart = true;
    }

    var curPhi, curTheta, ll, thetaDiff;
    var cameraDistance = camera.position.length();
    ll = Coordinates.toSpherical(lat, lon, cameraDistance );
    lat = ll.lat;
    lon = ll.lon - ( Math.PI * 0.5 );
    curPhi = orbitControls.getPolarAngle();
    curTheta = -orbitControls.getAzimuthalAngle();
    thetaDiff = lon - curTheta;
    while (thetaDiff > Math.PI) {
      thetaDiff -= Math.PI * 2;
    }
    while (thetaDiff < -Math.PI) {
      thetaDiff += Math.PI * 2;
    }
    lon = curTheta + thetaDiff;

    var center = new THREE.Vector3();

    var tween = new TWEEN.Tween({
      phi: curPhi,
      theta: curTheta,
      dist: cameraDistance
    })
    .to({
      phi: lat,
      theta: lon,
      dist: idealDist
    }, duration )
    .easing( TWEEN.Easing.Quadratic.InOut )
    .onUpdate(function() {
      var xyz;
      this.theta += Math.PI / 2;
      xyz = Coordinates.sphericalToXYZ({
        radius: this.dist,
        lat: this.phi,
        lon: this.theta
      });
      camera.position.set(xyz.x, xyz.y, xyz.z);
      camera.lookAt( center );
      return orbitControls.update();
    });

    if( autoStart ){
      tween.start();
    }

    return tween;
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

  that.getCameraLatLong = function(){
    var cp = camera.position;
    var location = Coordinates.XYZToSpherical( cp.x, cp.y, cp.z );
    return {
      lat: location.lat,
      lon: location.lon
    };
  };

  that.getCameraDistance = function(){
    return camera.position.length();
  };

  return that;
};