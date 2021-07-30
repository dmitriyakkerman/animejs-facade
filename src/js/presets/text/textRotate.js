//Появление текста буква за буквой с поворотом по оси Y

const anime = require('../../anime.min');

module.exports = {
    begin: function(anim) {
        anim.animatables[0].target.innerHTML = anim.animatables[0].target.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    },
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.querySelectorAll('.letter'),
            rotateY: [-90, 0],
            duration: 1300,
            delay: function(el, i) {
                return i * 150
            }
        });
    }
}