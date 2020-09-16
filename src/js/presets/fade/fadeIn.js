//Появляение элементов на основе прозрачности от 0 до 1

module.exports = {
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1000,
    delay: function(el, i) {
        return i * 150
    }
}