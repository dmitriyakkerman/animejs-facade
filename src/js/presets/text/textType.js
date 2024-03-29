//Эффект печати текста

const anime = require('../../anime.min');

module.exports = {
    begin: function(anim) {
        anim.animatables[0].target.lastElementChild.innerHTML = anim.animatables[0].target.lastElementChild.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    },
    complete: function(anim) {
        anime({
            targets: anim.animatables[0].target.querySelectorAll('.line'),
            scaleY: [0,1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700
        });
        anime({
            targets: anim.animatables[0].target.querySelectorAll('.line'),
            left: [0, '100%'],
            easing: "easeOutExpo",
            duration: 700,
            delay: 500
        });
        anime({
            targets: anim.animatables[0].target.querySelectorAll('.letter'),
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
            delay: function(el, i) {
                if(i === 0) {
                    return 450
                }
                else {
                    return 450 + (i * 35)
                }
            }
        });
    }
}