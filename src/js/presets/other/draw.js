//Прорисовка обводки svg элемента

const anime = require('../../anime.min');

module.exports = {
    strokeDashoffset: function () {
        return [anime.setDashoffset, 0]
    },
    duration: 1500,
    delay: function(el, i) {
        return i * 250
    },
    easing: 'easeInOutSine'
}