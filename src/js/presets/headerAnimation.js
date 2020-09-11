const easings = require('../easings');

module.exports = [
    {
        translateY: ['-100px', 0],
        opacity: [0, 1],
        duration: 300,
        easing: easings.easeOut
    },
    {
        translateY: ['-50px', 0],
        opacity: [0, 1],
        duration: 300,
        delay: function(el, i) {
            return i * 100
        },
        easing: easings.easeInOut
    },
    {
        translateX: ['500px', 0],
        opacity: [0, 1],
        delay: function(el, i) {
            return i * 80
        },
        duration: 300,
        easing: easings.linear
    }
];