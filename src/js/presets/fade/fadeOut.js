//Скрытие элементов на основе прозрачности от 1 до 0

module.exports = {
    opacity: [1, 0],
    easing: "easeOutExpo",
    duration: 1000,
    delay: function(el, i) {
        return i * 150
    }
}