[![Build Status](https://travis-ci.org/dmitriyakkerman/animejs-facade.svg?branch=master)](https://travis-ci.org/dmitriyakkerman/animejs-facade)

**Usage:**

ES6 import: 
            
    import AnimeFacade from 'animejs-facade.min.js'

Require:
    
    const AnimeFacade = require('animejs-facade.min.js');
    
Script:

    <script src="./dist/js/animejs-facade.min.js"></script>

Markup:

_Preset with default options:_

    new AnimeFacade('.logo', {
        preset: {
            name: 'scaleIn'
        }
    });    

_Preset with custom options:_

    new AnimeFacade('.logo', {
        preset: {
            name: 'scaleIn',
            params: {
                scale: [0, 1],
                duration: 2500,
                easing: "easeOutBounce",
                offset: -500
            }
        }
    });  

_Instance with custom options without preset:_

        new AnimeFacade('.logo', {
            custom: {
                params: {
                    translateX: [0, '100px'],
                }
            }            
        });
