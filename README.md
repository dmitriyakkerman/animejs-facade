[![Build Status](https://travis-ci.org/dmitriyakkerman/animejs-facade.svg?branch=master)](https://travis-ci.org/dmitriyakkerman/animejs-facade)

**Download:**

_1. Download Anime.js via npm or manual download:_

Npm

    npm install animejs --save
    
Manual download

[Anime.js](https://github.com/juliangarnier/anime/archive/master.zip)

_2. Download AnimeFacade_
    

**Usage:**

ES6 import: 
            
    import anime from 'animejs/lib/anime.es.js';
    import AnimeFacade from 'animejs-facade.min.js'

Require:
    
    const anime = require('animejs');
    const animeFacade = require('animejs-facade.min.js');
    
Script:

    <script src="anime.min.js"></script>
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
        },
        direction: 'alternate'
    });  

_Instance with custom options without preset:_

        new AnimeFacade('.logo', {
            custom: {
                params: {
                    translateX: [0, '100px'],
                }
            }            
        });