const AnimeFacade = require('../src/js/animejs-facade');
const defaults = require('../src/js/defaults');
const presets = require('../src/js/presets');
const easings = require('../src/js/easings');

describe('AnimeFacade Tests', () => {

    test('AnimeFacade should be defined', () => {
        expect(AnimeFacade).toBeDefined();
    });

    test('Defaults should be defined', () => {
        expect(defaults).toBeDefined();
    });

    test('Presets should be defined', () => {
        expect(presets).toBeDefined();
    });

    test('Easings should be defined', () => {
        expect(easings).toBeDefined();
    });

})