//Появление текста буква за буквой сверху-вниз

const anime = require('../../anime.min');

module.exports = {
    begin: function(anim) {
        anim.animatables[0].target.innerHTML = anim.animatables[0].target.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    },
    duration: 100,
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.querySelectorAll('.letter'),
            translateY: [-100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: function(el, i) {
                return (30 * i) + 300
            }
        });
    }
}