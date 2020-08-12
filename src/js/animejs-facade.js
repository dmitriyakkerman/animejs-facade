(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AnimeFacade = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  let presets = {
    translateX: '100%',
    translateY: '100%',
    scale: 1,
    rotate: '0',
    width: '100%',
    height: '100%',
    opacity: 1,
    backgroundColor: '#FFF',
    borderRadius: ['0%', '50%'],
  }

  let defaults = {
    presets: {
      name: 'translateX',
    },
    duration: 1000,
    delay: 0,
    easing: 'linear',
    animationType: 'parallel',
    direction: 'normal',
    loop: false
  }

  class AnimeFacade {
    constructor(targets, options = {}) {

      if(!targets) {
        throw new Error('No target selector');
      }

      this.targets = typeof(targets) === 'string' ? document.querySelectorAll(targets) : targets;
      this.options = options || {};

      if(!Object.keys(this.options).length) {
        return
      }
      else {
        this.options.presets.name = options.presets.name || defaults.presets.name;
        this.options.duration = options.presets.duration || options.duration || defaults.duration;
        this.options.delay = options.presets.delay || options.delay || defaults.delay;
        this.options.easing = options.presets.easing || options.easing || defaults.easing;
        this.options.loop = options.presets.loop || options.loop || defaults.loop;
        this.options.direction = options.presets.direction || options.direction || defaults.direction;
        this.options.animationType = options.animationType || defaults.animationType;
      }

      this.getChosenPreset(presets);
      this.initOnLoad();
      this.initOnScroll();
    }

    setOptions() {

      let that = this;

      that.targets.forEach(function(targetElement) {
          that.getOptions(targetElement, that.getChosenPreset(presets));

      })
    }

    initOnLoad() {

      let that = this;

      that.initBase();
    }

    initOnScroll() {

      let that = this;

      window.addEventListener('scroll', function() {
        that.initBase();
      })
    }

    initBase() {

      let that = this;

      that.targets.forEach(function(targetElement) {
        let windowHeight = window.innerHeight;
        let targetPosition = targetElement.getBoundingClientRect().top;
        if (targetPosition - windowHeight <= 0 && !targetElement.classList.contains('animated')) {
          that.setOptions(that.getOptions(targetElement, that.getChosenPreset(presets)));
          targetElement.classList.add('animated');
        }
      })
    }

    getChosenPreset(presets) {

      let that = this;
      let matchedObject;

      if(Array.isArray(that.options.presets)) {

        matchedObject = [];

        that.options.presets.forEach(function(chosenPresetKey) {
          for(let existingPresetKey in presets) {
            if(presets.hasOwnProperty(existingPresetKey)) {
              if(chosenPresetKey.name === existingPresetKey) {
                 matchedObject = matchedObject.concat([{ [existingPresetKey]: chosenPresetKey.params || presets[existingPresetKey] }]);
              }
            }
          }
        })
      }
      else {

        for(let existingPresetKey in presets) {
          if(presets.hasOwnProperty(existingPresetKey)) {
            if(that.options.presets.name === existingPresetKey) {
              matchedObject = {
                [existingPresetKey]: that.options.presets.params || presets[existingPresetKey]
              };
            }
          }
        }
      }

      return matchedObject;
    }

    getOptions(targetElement, preset) {

      let that = this;

      let data = Object.assign({
        targets: targetElement,
        duration: that.options.duration,
        delay: that.options.delay,
        easing: that.options.easing,
        loop: that.options.loop,
        direction: that.options.direction,
        animationType: that.options.animationType,
        keyframes: that.options.animationType === 'consistent' && Array.isArray(preset) ? preset : ''
      }, typeof(preset) === 'object' && !Array.isArray(preset) ? preset : {});

      if(Array.isArray(preset) && that.options.animationType === 'parallel') {
        preset.forEach(function(el) {
          Object.defineProperty(data, Object.keys(el), {
            value: Object.values(el)[0],
            enumerable: true,
            configurable: true,
          })
        })
      }

      return data;
    }

    setOptions(data) {
      anime(data);
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));