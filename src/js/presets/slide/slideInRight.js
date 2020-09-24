//Выдвижение элемента из родительского блока: первый дочерний блок выдвигается, затем появляется второй

const anime = require('../../anime.min');

module.exports = {
    translateX: ['-100%', 0],
    duration: 1500,
    easing: "easeInQuint",
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.firstElementChild,
            translateX: [0, '100%'],
            duration: 1000,
            easing: "easeInOutQuart"
        });
        anime({
            targets: anim.animatables[0].target.lastElementChild,
            opacity: [0, 1],
            duration: 500,
            delay: 300,
            easing: "easeOutCirc"
        });
    }
}