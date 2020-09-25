//Появление текста буква за буквой с поворотом по оси Y

const anime = require('../../anime.min');

module.exports = {
    begin: function(anim) {
        anim.animatables[0].target.innerHTML = anim.animatables[0].target.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    },
    duration: 100,
    complete: function(anim) {
        anime({
            targets: '.letter',
            rotateY: [-90, 0],
            duration: 1300,
            delay: function(el, i) {
                return i * 150
            }
        });
    }
}