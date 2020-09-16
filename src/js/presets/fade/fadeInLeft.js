//Появление элементов на основе прозрачности от 0 до 1 и перемещения справа налево

module.exports = {
    opacity: [0, 1],
    translateX: ['100px', 0],
    easing: "easeOutExpo",
    duration: 1000,
    delay: function(el, i) {
        return i * 150
    }
}
