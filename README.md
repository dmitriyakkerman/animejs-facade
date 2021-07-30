[![Build Status](https://travis-ci.org/dmitriyakkerman/animejs-facade.svg?branch=master)](https://travis-ci.org/dmitriyakkerman/animejs-facade)
[![codebeat badge](https://codebeat.co/badges/8e9519ac-eebd-424d-b8d9-7039f19df6d4)](https://codebeat.co/projects/github-com-dmitriyakkerman-animejs-facade-master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

**Usage:**

1.Connect [Anime.js](https://animejs.com/) and anime-facade.

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" integrity="sha512-z4OUqw38qNLpn1libAN9BsoDx6nbNFio5lA6CuTp9NlK83b89hgyCVq+N5FdBJptINztxn1Z3SaKSKUS5UP60Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="animejs-facade.min.js"></script>
```

2.Init your animation.

_Example with anime-facade preset:_

    new AnimeFacade('.logo', {
        preset: {
            name: 'scale'
        }
    });    

_Example with customized anime-facade preset:_

    new AnimeFacade('.logo', {
        preset: {
            name: 'scale',
            params: {
                scale: [0, 2],
                duration: 2500,
                easing: "easeOutBounce",
                offset: -500
            }
        }
    });  

_Example with custom Anime.js properties:_

    new AnimeFacade('.logo', {
        custom: {
            params: {
                translateX: [0, '100px'],
            }
        }            
    });
    
**Available presets**  

    fadeIn,
    fadeOut,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    scale,
    squeeze,
    slideInUp,
    slideInRight,
    slideRightScale,
    slideUpStretch,
    num,
    draw,
    textIn,
    textRotate,
    textType,
    textInLeft,
    textInRight,
    textInUp,
    textInDown  
