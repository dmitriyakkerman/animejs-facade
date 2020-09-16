//Появление элемента на основе прозрачности от 0 до 1 и перемещения снизу вверх

module.exports = {
    opacity: [0, 1],
    translateY: ['100px', 0],
    easing: "easeOutExpo",
    duration: 2000,
    delay: function(el, i) {
        return i * 150
    }
}
