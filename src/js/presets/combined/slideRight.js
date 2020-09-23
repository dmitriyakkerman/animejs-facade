//Выдвижение элемента из родительского блока: сначала первый дочерний блок, затем второй

const anime = require('../../anime.min');

module.exports = {
    width: [0, '100%'],
    duration: 1500,
    easing: "easeInQuint",
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.firstElementChild,
            translateX: '100%',
            duration: 1000,
            easing: "easeInOutQuart"
        });
        anime({
            targets: anim.animatables[0].target.lastElementChild,
            scale: [1.2, 1],
            duration: 1800,
            delay: 100,
            easing: "easeOutCirc"
        });
    }
}