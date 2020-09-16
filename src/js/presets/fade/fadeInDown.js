//Появление элемента на основе прозрачности от 0 до 1 и перемещения сверху вниз

module.exports = {
    opacity: [0, 1],
    translateY: ['-50px', 0],
    duration: 500,
    delay: function(el, i) {
        return i * 100
    },
    easing: "easeOutExpo"
}
