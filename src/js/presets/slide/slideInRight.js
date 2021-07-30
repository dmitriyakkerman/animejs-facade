//Выдвижение элемента из родительского блока: первый дочерний блок выдвигается, затем появляется второй

const anime = require('../../anime.min');

module.exports = {
    translateX: ['-100%', 0],
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.firstElementChild,
            translateX: [0, '100%'],
            duration: 1000,
            easing: "easeInOutQuart"
        });
    }
}