const AnimeFacade = require('../src/js/animejs-facade');
const defaults = require('../src/js/defaults');
const presets = require('../src/js/presets');

let animeFacadeInstance;
let params = {
    duration: 1000,
        delay: function(el, i) {
        return (i + 1) * 100
    }
}

describe('AnimeFacade Tests', () => {

    document.body.innerHTML = `
    <div class="header">
        <li></li>
    </div>
  `;

    beforeEach(() => {
        animeFacadeInstance = new AnimeFacade('.header li', {
            preset: {
                name: 'fadeInDown',
                params
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
        expect(animeFacadeInstance.targets).toBeDefined();
        expect(animeFacadeInstance.targets).toBeInstanceOf(Array);
        expect(animeFacadeInstance.targets.length).toBe(1);
    });

    test('AnimeFacade should have preset named "fadeInDown" ', () => {
        expect(animeFacadeInstance.options).toBeDefined();
        expect(animeFacadeInstance.options.preset).toBeInstanceOf(Object);
        expect(animeFacadeInstance.options.preset.name).toBe("fadeInDown");
    });

    test('AnimeFacade should have additional array of params for preset customization', () => {
        expect(animeFacadeInstance.options.preset.params).toBeDefined();
        expect(animeFacadeInstance.options.preset.params).toBeInstanceOf(Object);
        expect(animeFacadeInstance.options.preset.params).toEqual(params);
    });

})