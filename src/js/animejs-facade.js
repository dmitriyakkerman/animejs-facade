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
    preset: {
      name: 'translateX',
    },
    duration: 1000,
    delay: 0,
    easing: 'linear',
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
        this.options.preset.name = options.preset.name || defaults.preset.name;
        this.options.duration = options.preset.duration || options.duration || defaults.duration;
        this.options.delay = options.preset.delay || options.delay || defaults.delay;
        this.options.easing = options.preset.easing || options.easing || defaults.easing;
        this.options.loop = options.preset.loop || options.loop || defaults.loop;
        this.options.direction = options.preset.direction || options.direction || defaults.direction;
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
          that.setOptions(that.getOptions(targetElement, that.getChosenPreset(presets)));
          targetElement.classList.add('animated');
        }
      })
    }

    getChosenPreset(presets) {

      let that = this;
      let matchedObject;

      if(Array.isArray(that.options.preset)) {

        matchedObject = [];

        that.options.preset.forEach(function(chosenPresetKey) {
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
            if(that.options.preset.name === existingPresetKey) {
              matchedObject = JSON.stringify({ [existingPresetKey]: that.options.preset.params || presets[existingPresetKey] });
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
        keyframes: Array.isArray(preset) ? preset : ''
      }, typeof(preset)  === 'string' ? JSON.parse(preset) : {});

      return data;
    }

    setOptions(data) {
      anime(data);
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));