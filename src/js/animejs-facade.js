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
    easing: 'easeInOutExpo'
  }

  class AnimeFacade {
    constructor(targets, options = {}) {

      if(!targets) {
        throw new Error('No target selector');
      }

      this.targets = targets;
      this.options = options || {};

      if(!Object.keys(this.options).length) {
        return
      }
      else {
        this.options.preset.name = options.preset.name || defaults.preset.name,
        this.options.duration = options.duration || defaults.duration,
        this.options.delay = options.delay || defaults.delay,
        this.options.easing = options.easing || defaults.easing
      }

      this.getChosenPreset(presets);
      this.initOnScroll();
    }

    initOnScroll() {

      let that = this;

      let isBlocked = true;

      window.addEventListener('scroll', function() {
        that.targets.forEach(function(targetElement, index) {
          let windowHeight = window.innerHeight;
          let targetPosition = targetElement.getBoundingClientRect().top;
          if (targetPosition - windowHeight <= 0) {
            if(isBlocked) {
              that.initAnime(targetElement, that.getChosenPreset(presets));
              isBlocked = false;
            }
            isBlocked = false;
          }
        })
      })
    }

    getChosenPreset(presets) {

      let that = this;

      let matchedObject;

      for(let preset in presets) {
        if(presets.hasOwnProperty(preset)) {
          if(that.options.preset.name === preset) {
            matchedObject = JSON.stringify({ [preset]: that.options.preset.params || presets[preset] });
          }
        }
      }
      return matchedObject;
    }

    initAnime(targetElement, preset) {

      let that = this;

      let data = Object.assign({
        targets: targetElement,
        duration: that.options.duration,
        delay: that.options.delay,
        easing: that.options.easing
      }, JSON.parse(preset));

      anime(data);

    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));