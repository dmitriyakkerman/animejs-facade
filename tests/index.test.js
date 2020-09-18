const AnimeFacade = require('../src/js/animejs-facade');
const defaults = require('../src/js/defaults');
const presets = require('../src/js/presets');

let presetInstance;
let customParamsInstance;
let params1 = {
    duration: 1000,
        delay: function(el, i) {
        return (i + 1) * 100
    }
};
let params2 = {
    translateX: [0, 200],
    opacity: [0, 1],
    duration: 2000
}

describe('AnimeFacade Tests', () => {

    document.body.innerHTML = `
    <div class="header">
        <li></li>
    </div>
  `;

    beforeEach(() => {
        presetInstance = new AnimeFacade('.header li', {
            preset: {
                name: 'fadeInDown',
                params: params1
            }
        });
        customParamsInstance = new AnimeFacade('.header li', {
            custom: {
                params: params2
            }
        })
    });

    test('Defaults should be defined', () => {
        expect(defaults).toBeDefined();
        expect(defaults).toBeInstanceOf(Object);
    });

    test('Presets should be defined', () => {
        expect(presets).toBeDefined();
        expect(presets).toBeInstanceOf(Object);
    });

    test('AnimeFacade should be defined', () => {
        expect(AnimeFacade).toBeDefined();
    });

    test('AnimeFacade should receive target element', () => {
        expect(presetInstance.targets).toBeDefined();
        expect(presetInstance.targets).toBeInstanceOf(Array);
        expect(presetInstance.targets.length).toBe(1);
    });

    test('AnimeFacade should have preset named "fadeInDown" ', () => {
        expect(presetInstance.options).toBeDefined();
        expect(presetInstance.options.preset).toBeInstanceOf(Object);
        expect(presetInstance.options.preset.name).toBe("fadeInDown");
    });

    test('AnimeFacade should have additional array of params for preset customization', () => {
        expect(presetInstance.options.preset.params).toBeDefined();
        expect(presetInstance.options.preset.params).toBeInstanceOf(Object);
        expect(presetInstance.options.preset.params).toEqual(params1);
    });

    test('AnimeFacade should have object of custom settings', () => {
        expect(customParamsInstance.options.custom.params).toBeDefined();
        expect(customParamsInstance.options.custom.params).toBeInstanceOf(Object);
        expect(customParamsInstance.options.custom.params).toEqual(params2);
    });

})