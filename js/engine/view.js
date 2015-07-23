/* globals Engine, THREE, ObjectControls, $, THREEx, console */

'use strict';

Engine.createView = function( args ){
  var that = {};

  var renderWidth = window.innerWidth;
  var renderHeight = window.innerHeight;

  var camera = new THREE.PerspectiveCamera( 60, renderWidth/renderHeight, 0.1, 1000 );

  //  some default camera location
  camera.position.set( 140, 130, 170 );
  camera.position.normalize().multiplyScalar( 100 );

  var renderer = Engine.createRenderer( camera );
  var $render = $( '#render' );
  if( $render.length === 0 ){
    $render = $('<div>')
    .attr( 'id', 'render' )
    .addClass( ' unselectable' )
    .appendTo( $( document.body ) );
  }

  $render.append( $( renderer.getDomElement() ) );

  var scene = renderer.getScene();
  var glowScene = renderer.getGlowScene();

  var space = new THREE.Group();
  scene.add( space );

  var glowSpace = new THREE.Group();
  glowScene.add( glowSpace );


  //  TODO
  //  place this elsewhere
  Engine.createDefaultLights().forEach( function( light ){
    scene.add( light );
  });

  //  TODO
  //  rewrite light engine for culling
  var lights = [];
  var deferredLightCount = 4096;
  ( function makeLights( count ){
    do{
      var light = new THREE.PointLight( 0xE0A075, 2.0, 2.0 );
      // var light = new THREE.PointLight( 0x88aaff, 2.0, 2.0 );
      light.visible = false;
      light.enabled = false;
      light.frustumCulled = true;
      lights.push( light );
      space.add( light );
    }while( lights.length < count );
  }( deferredLightCount ) );

  that.setLight = function( idx, lightData ){
    var light = lights[ idx ];
    light.visible = true;
    light.enabled = true;
    light.position.set( lightData.x, lightData.y, lightData.z );
    light.distance = lightData.distance;
    light.intensity = lightData.intensity;
    light.color.setHSL( lightData.h, lightData.s, lightData.l );
    return light;
  };

  that.clearLights = function(){
    lights.forEach( function( light ){
      light.position.set( 0,0,0 );
      light.visible = false;
      light.enabled = false;
    });
  };

  that.clearLightRange = function( start, count ){
    var end = start + count;
    for( var i=start; i<end; i++ ){
      var light = lights[ i ];
      light.position.set( 0,0,0 );
      light.visible = false;
      light.enabled = false;
    }
  };

  var groupIdx = 0;
  that.registerLightGroup = function( count ){
    var current = groupIdx;
    groupIdx += count;
    if( groupIdx > deferredLightCount ){
      console.warn( 'out of lights to register group' );
      return 0;
    }
    return current;
  };

  var objectControls = new ObjectControls( camera );

  var allowObjectControls = true;

  objectControls.objectIntersected = function(){
    if( this.intersected && allowObjectControls ){
      var intersection = this.getIntersectionPoint( this.intersected );
      if( this.intersected.hoverMove ){
        var e = {
          intersectionPoint: intersection
        };
        this.intersected.hoverMove( e );
      }
    }
  };

  function render(){
    renderer.render();
  }

  THREEx.WindowResize( renderer.getForwardRenderer(), camera );

  (function drawLoop( nowMsec )
  {
    if( allowObjectControls ){
      objectControls.update();
    }

    render( nowMsec );

    scene.traverse( function( o ){
      if( o.update ){
        if( o instanceof THREE.LOD ){
          o.update( camera );
        }
        else{
          o.update();
        }
      }
    });

    glowScene.traverse( function( o ){
      if( o.update ){
        if( o instanceof THREE.LOD ){
          o.update( camera );
        }
        else{
          o.update();
        }
      }
    });

    requestAnimationFrame( drawLoop );

  })( Date.now() );

  that.getRenderer = function(){
    return renderer;
  };

  that.getSpace = function(){
    return space;
  };

  that.getGlowSpace = function(){
    return glowSpace;
  };

  that.getCamera = function(){
    return camera;
  };

  that.getDomElement = function(){
    return renderer.getDomElement();
  };

  return that;
};

Engine.createDefaultLights = function(){
  var lights = [];

  var light = new THREE.PointLight( 0xbbbbee, 7, 500 );
  light.position.x = 40;
  light.position.y = 70;
  light.position.z = 300;
  lights.push( light );

  var light2 = new THREE.PointLight( 0x4477cc, 7, 500 );
  light2.position.x = -140;
  light2.position.y = -20;
  light2.position.z = 170;
  lights.push( light2 );

  var light3 = new THREE.PointLight( 0xaaaaee, 5, 700 );
  light3.position.x = -140;
  light3.position.y = 160;
  light3.position.z = -200;
  lights.push( light3 );

  return lights;
};