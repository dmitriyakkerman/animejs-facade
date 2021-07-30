//Выдвижение элемента из родительского блока: родительский блок меняет высоту и выдвигается снизу вверх

const anime = require('../../anime.min');

module.exports = {
    height: function(el) {
      return [0, window.getComputedStyle(el).height]
    },
    translateY: ['200px', 0]
}