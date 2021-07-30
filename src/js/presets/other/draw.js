//Прорисовка обводки svg элемента

const anime = require('../../anime.min');

module.exports = {
    strokeDashoffset: function () {
        return [anime.setDashoffset, 0]
    }
}