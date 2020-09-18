//Выдвижение элемента из родительского блока

module.exports = {
    width: [0, '100%'],
    easing: "easeInQuint",
    duration: 2000,
    complete: function(anim) {
        if(anime) {
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
}