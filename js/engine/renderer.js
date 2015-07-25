/* globals Engine, THREE, createAdditiveBlendShader, $ */

'use strict';

Engine.createRenderer = function( camera, options ){

  var renderWidth = window.innerWidth;
  var renderHeight = window.innerHeight;

  var deferredRenderer = new THREE.WebGLDeferredRenderer({
    antialias: true,
    tonemapping: THREE.FilmicOperator,
    brightness: options.brightness,
    scale: 1.0,
    width: renderWidth,
    height: renderHeight
  });

  var forwardRenderer = deferredRenderer.renderer;



  var depthShader = THREE.ShaderLib.depthRGBA;
  var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );
  var depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
  var depthTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    antialias: true
  });

  var ssao = new THREE.ShaderPass( THREE.SSAOShader );
  ssao.uniforms.tDepth.value = depthTarget;
  ssao.uniforms.size.value.set( window.innerWidth * 0.125, window.innerHeight * 0.125 );
  ssao.uniforms.cameraNear.value = 0.5;
  ssao.uniforms.cameraFar.value = 20.0;
  ssao.uniforms.aoClamp.value = 0.7;
  ssao.uniforms.lumInfluence.value = 0.1;

  // deferredRenderer.addEffect( ssao );


  var glowComposerPass = Engine.createGlowComposerPass( forwardRenderer, camera, options.glowBlur );

  var bloomPass = new THREE.BloomPass( options.bloom );
  var additivePass = Engine.createAdditivePass( glowComposerPass );
  deferredRenderer.addEffect( bloomPass );
  deferredRenderer.addEffect( additivePass );

  var deferredScene = new THREE.Scene();

  $( window ).resize( function(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    deferredRenderer.setSize( w, h );
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });



  var that = {};

  that.getDomElement = function(){
    return deferredRenderer.domElement;
  };

  that.render = function(){
    deferredScene.overrideMaterial = depthMaterial;
    forwardRenderer.render( deferredScene, camera, depthTarget, true );
    deferredScene.overrideMaterial = null;

    glowComposerPass.render();
    forwardRenderer.clear();
    deferredRenderer.render( deferredScene, camera );
  };

  that.getScene = function(){
    return deferredScene;
  };

  that.getGlowScene = function(){
    return glowComposerPass.scene;
  };

  that.getForwardRenderer = function(){
    return forwardRenderer;
  };

  that.width = function(){
    return forwardRenderer.context.canvas.width;
  };

  that.height = function(){
    return forwardRenderer.context.canvas.height;
  };

  return that;
};

Engine.createGlowComposerPass = function( forwardRenderer, camera, blurAmount ){
  var that = {};
  var scene = new THREE.Scene();

  var blurPasses = 4;
  var blurPassArray = [];
  for( var i=0; i<blurPasses; i++ ){
    var hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
    var vblur = new THREE.ShaderPass( THREE.VerticalBlurShader );

    var bluriness = 1 + ( i * blurAmount );

    hblur.uniforms.h.value = bluriness / window.innerWidth;
    vblur.uniforms.v.value = bluriness / window.innerHeight;
    blurPassArray.push( hblur, vblur );
  }

  var renderPass = new THREE.RenderPass( scene, camera );
  renderPass.clear = true;

  var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
  effectCopy.renderToScreen = true;


  var glowComposer = new THREE.EffectComposer( forwardRenderer );

  glowComposer.addPass( renderPass );

  blurPassArray.forEach( function( pass ){
    glowComposer.addPass( pass );
  });

  glowComposer.addPass( effectCopy );

  var emissiveComposer = new THREE.EffectComposer( forwardRenderer );
  emissiveComposer.addPass( renderPass );
  var fxaa = new THREE.ShaderPass( THREE.FXAAShader );
  fxaa.uniforms.resolution.value = new THREE.Vector2( 1/window.innerWidth, 1/window.innerHeight );
  emissiveComposer.addPass( fxaa );
  emissiveComposer.addPass( effectCopy );

  that.scene = scene;
  that.render = function(){
    glowComposer.render();
    emissiveComposer.render();
  };

  that.getEmissiveRT = function(){
    return emissiveComposer.renderTarget2;
  };

  that.getGlowRT = function(){
    return glowComposer.renderTarget2;
  };

  return that;
};

Engine.createAdditivePass = function( glowComposerPass ){
  var additiveBlendShader = createAdditiveBlendShader();
  additiveBlendShader.uniforms.tGlow.value = glowComposerPass.getGlowRT();
  additiveBlendShader.uniforms.tEmissive.value = glowComposerPass.getEmissiveRT();

  var additivePass = new THREE.ShaderPass( additiveBlendShader );
  additivePass.needsSwap = true;
  additivePass.renderToScreen = false;
  return additivePass;
};