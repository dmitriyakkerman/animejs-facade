// Выдвижение элемента из родительского блока снизу-вверх с прозрачностью

module.exports = {
    opacity: [0, 1],
    translateY: ['100%', 0],
    duration: 1000,
    delay: function(el, i) {
        return i * 100
    },
    easing: "easeInQuint"
}