//Появление элемента на основе прозрачности от 0 до 1 и перемещения слева направо

module.exports = {
    opacity: [0, 1],
    translateX: [0, '100px'],
    easing: "easeOutExpo",
    duration: 1000,
    delay: function(el, i) {
        return i * 150
    }
}