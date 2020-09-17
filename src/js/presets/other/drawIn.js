//Прорисовка обводки svg элемента

module.exports = {
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) {
        return i * 250
    }
}