//Анимация-счетчик числового значения элемента от и до

module.exports = {
    innerHTML: function(el) {
        return [0, el.dataset.n]
    },
    round: 1,
    duration: 1000,
    delay: function(el, i) {
        return i * 100
    }
}