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
    
**Examples:**

Single animation with additional options:
    
     new AnimeFacade('.logo', {
         presets: {
             name: 'translateX',
             params: ['100px', '500px'],
             duration: 2000,
             delay: 1000,
             easing: 'easeInExpo'
         }
     });

Multiple parallel animations:
   
    new AnimeFacade('li', {
        presets: [
            {
                name: 'opacity',
                params: [0, 1],
            },
            {
                name: 'translateY',
                params: ['0', '100px'],
            },
        ],
        animationType: 'parallel',
        duration: 2000,
        delay: 1000
    });
    
Multiple consistent animations:
    
    new AnimeFacade('img', {
        presets: [
            {
                name: 'translateX',
                params: '100px',
            },
            {
                name: 'translateY',
                params: '100px',
            },
        ],
        animationType: 'consistent',
        duration: 4000,
        delay: 1000
    });
    
    