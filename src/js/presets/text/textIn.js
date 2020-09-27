//Появление текста буква за буквой с прозрачностью

const anime = require('../../anime.min');

module.exports = {
    begin: function(anim) {
        anim.animatables[0].target.innerHTML = anim.animatables[0].target.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    },
    duration: 100,
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.querySelectorAll('.letter'),
            opacity: [0, 1],
            easing: "easeInOutQuad",
            duration: 500,
            delay: function(el, i) {
                return (i + 1) * 100
            }
        });
    }
}