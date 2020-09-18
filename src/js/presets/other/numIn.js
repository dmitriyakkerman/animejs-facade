//Анимация числового значения элемента от и до

module.exports = {
    innerHTML: function(el) {
        return [0, el.dataset.n]
    },
    delay: function(el, i) {
        return i * 100
    },
    duration: 1000,
    round: 1
}