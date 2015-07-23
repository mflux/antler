/* exported createAdditiveBlendShader */

'use strict';

var createAdditiveBlendShader = function(){
  return {
    uniforms: {
      tDiffuse: { type: 't', value: undefined }, // The base scene buffer
      tGlow: { type: 't', value: undefined }, // The glow scene buffer
      tEmissive: { type: 't', value: undefined }
    },

    vertexShader: [
      'varying vec2 vUv;',

      'void main() {',

        'vUv = vec2( uv.x, uv.y );',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

      '}'
    ].join('\n'),

    fragmentShader: [
      'uniform sampler2D tDiffuse;',
      'uniform sampler2D tGlow;',
      'uniform sampler2D tEmissive;',

      'varying vec2 vUv;',

      'void main() {',

        'vec4 texel = texture2D( tDiffuse, vUv );',
        'vec4 glow = texture2D( tGlow, vUv );',
        'vec4 emissive = texture2D( tEmissive, vUv );',
        'gl_FragColor = texel + emissive + vec4(1.0, 1.0, 1.0, 1.0) * glow * 2.0;',
      '}'
    ].join('\n')
  };
};