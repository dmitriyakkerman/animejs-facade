//Анимация-счетчик числового значения элемента от и до

module.exports = {
    innerHTML: function(el) {
        return [0, el.dataset.n]
    },
    round: 1
}