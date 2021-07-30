//Появление текста с прозрачностью и перемещением слева-направо

const anime = require('../../anime.min');

module.exports = {
    begin: function(anim) {
        anim.animatables[0].target.innerHTML = anim.animatables[0].target.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    },
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.querySelectorAll('.letter'),
            opacity: [0, 1],
            translateX: [100, 0],
            easing: "easeOutExpo",
            duration: 1200,
            delay: function(el, i) {
                return (i * 30) + 500
            }
        });
    }
}