const AnimeFacade = require('../src/js/animejs-facade');
const defaults = require('../src/js/defaults');
const presets = require('../src/js/presets');
const easings = require('../src/js/easings');

let animeFacadeInstance;
let params = [
    {
        translateX: [0, '100px'],
        width: [0, '100px'],
        duration: 1000,
        delay: 500
    },
    {
        translateY: [0, '100px'],
        duration: 1000,
        delay: 300,
        offset: -500
    },
    {
        scale: [0, 2],
        height: [0, '10px'],
        duration: 1000,
        offset: 1000
    }
]

describe('AnimeFacade Tests', () => {

    beforeEach(() => {
        animeFacadeInstance = new AnimeFacade(['div', 'ul', 'span'], {
            preset: {
                name: 'someAnimation',
                params: params
            }
        });
    })

    test('Defaults should be defined', () => {
        expect(defaults).toBeDefined();
    });

    test('Presets should be defined', () => {
        expect(presets).toBeDefined();
    });

    test('Easings should be defined', () => {
        expect(easings).toBeDefined();
    });

    test('AnimeFacade should be defined', () => {
        expect(AnimeFacade).toBeDefined();
    });

    test('AnimeFacade should receive array of 3 target elements', () => {
        expect(animeFacadeInstance.targets).toBeDefined();
        expect(animeFacadeInstance.targets).toBeInstanceOf(Array);
        expect(animeFacadeInstance.targets.length).toBe(3);
    });

    test('AnimeFacade should have preset option named "someAnimation" ', () => {
        expect(animeFacadeInstance.options).toBeDefined();
        expect(animeFacadeInstance.options.preset).toBeInstanceOf(Object);
        expect(animeFacadeInstance.options.preset.name).toBe("someAnimation");
    });

    test('AnimeFacade should have additional array of params for preset customization', () => {
        expect(animeFacadeInstance.options.preset.params).toBeDefined();
        expect(animeFacadeInstance.options.preset.params).toBeInstanceOf(Array);
        expect(animeFacadeInstance.options.preset.params).toEqual(params);
    })

})