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

  function calcState(){
    var curPhi = orbitControls.getPolarAngle();
    var curTheta = -orbitControls.getAzimuthalAngle();
    return {
      phi: curPhi,
      theta: curTheta
    };
  }

  function calcGoal( lat, lon, current, distance ){
    ll = Coordinates.toSpherical(lat, lon, distance );
    lat = ll.lat;
    lon = ll.lon - ( Math.PI * 0.5 );

    var ll, thetaDiff;


    thetaDiff = lon - current.theta;
    while (thetaDiff > Math.PI) {
      thetaDiff -= Math.PI * 2;
    }
    while (thetaDiff < -Math.PI) {
      thetaDiff += Math.PI * 2;
    }
    lon = current.theta + thetaDiff;
    return {
      phi: lat,
      theta: lon
    };
  }

  function rotateTo( lat, lon, duration, autoStart ) {
    if( autoStart === undefined ){
      autoStart = true;
    }

    var cameraDistance = camera.position.length();

    var center = new THREE.Vector3();

    var current = calcState();
    var animState = {
      phi: current.phi,
      theta: current.theta
    };

    var animGoal = {
      phi: 0,
      theta: 0
    };

    var tween = new TWEEN.Tween( animState )
    .onStart( function(){
      var current = calcState();
      animState.phi = current.phi;
      animState.theta = current.theta;

      var goal = calcGoal( lat, lon, current, cameraDistance );
      animGoal.phi = '+' + ( goal.phi - current.phi );
      animGoal.theta = '+' + ( goal.theta - current.theta );
    })
    .to( animGoal, duration )
    .easing( TWEEN.Easing.Quadratic.InOut )
    .onUpdate(function() {
      var xyz;
      this.theta += Math.PI / 2;
      xyz = Coordinates.sphericalToXYZ({
        radius: cameraDistance,
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

  return that;
};