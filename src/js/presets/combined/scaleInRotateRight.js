//Появление элемента на основе масштабирования от 0 до 1, прозрачности от 0 до 1 и вращения слева направо

module.exports = {
    scale: [0, 1],
    rotate: ['-60deg', '0deg'],
    opacity: [
        {
            value: 0, duration: 0
        },
        {
            value: 1, duration: 2000
        }
    ],
    easing: "easeOutExpo",
    duration: 2000,
    delay: 800,
};
