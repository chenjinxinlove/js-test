( function( window ) {

    'use strict';
    
    var BreathingHalftone = window.BreathingHalftone;
    
    var isInited = false;
    
    var halftone;
    
    // options for each demo
    var demoOptions = {
      sarah: {},
    
      ncsu: {
        dotSizeThreshold: 0.1,
        isAdditive: true,
        isRadial: true,
        friction: 0.04,
        hoverDiameter: 0.8,
        hoverForce: 0.007,
        activeDiameter: 0.8,
        activeForce: -0.007
      },
    
      'the-look': {
        dotSize: 1/70,
        initVelocity: 0.05,
        oscAmplitude: 0,
        friction: 0.05,
        channels: [ 'rgba(0,179,160,.5)', 'rgba(255,243,229,.1)', 'rgba(38,42,47,.7)' ]
      }
    };
    
    function init() {
      
    
    }
    
    document.addEventListener( 'DOMContentLoaded', init, false );
    window.onload = init;
    
    })( window );