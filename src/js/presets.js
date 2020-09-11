const easings = require('./easings');

module.exports = {
    headerAnimation: [
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
            delay: anime.stagger(100),
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
    ],
    screenAnimation: [
        {
            translateX: [0, '100%']
        },
    ],
    numberAnimation: [
        {
            innerHTML: [0, 100],
        }
    ]
};