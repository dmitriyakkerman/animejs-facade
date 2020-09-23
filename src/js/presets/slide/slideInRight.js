//Выдвижение элемента из родительского блока

const anime = require('../../anime.min');

module.exports = {
    width: [0, '100%'],
    easing: "easeInQuint",
    duration: 1500,
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.firstElementChild,
            translateX: '100%',
            easing: "easeInOutQuart",
            duration: 1000
        });
        anime({
            targets: anim.animatables[0].target.lastElementChild,
            scale: [1.2, 1],
            easing: "easeOutCirc",
            duration: 1800,
            delay: 100
        });
    }
}