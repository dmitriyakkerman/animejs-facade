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
    autoplay: false,
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
        this.options.duration = options.preset.duration || defaults.duration;
        this.options.delay = options.preset.delay || defaults.delay;
        this.options.easing = options.preset.easing || defaults.easing;
        this.options.autoplay = options.preset.autoplay || defaults.autoplay;
      }

      this.getChosenPreset(presets);
      this.initOptions();
      this.initOnLoad();
      this.startOnScroll();
    }

    initOptions() {

      let that = this;

      that.targets.forEach(function(targetElement) {
          that.getOptions(targetElement, that.getChosenPreset(presets));
      })
    }

    initOnLoad() {

      let that = this;

        that.targets.forEach(function(targetElement) {
          that.initAnime(that.getOptions(targetElement, that.getChosenPreset(presets)));
        })
    }

    startOnScroll() {

      let that = this;

      window.addEventListener('scroll', function() {
        that.targets.forEach(function(targetElement) {
          let windowHeight = window.innerHeight;
          let targetPosition = targetElement.getBoundingClientRect().top;
          if (targetPosition - windowHeight <= 0 && !targetElement.classList.contains('animated')) {
            that.initAnime(that.getOptions(targetElement, that.getChosenPreset(presets))).play();
            targetElement.classList.add('animated');
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

    getOptions(targetElement, preset) {

      let that = this;

      let data = Object.assign({
        targets: targetElement,
        duration: that.options.duration,
        delay: that.options.delay,
        easing: that.options.easing,
        autoplay: that.options.autoplay
      }, JSON.parse(preset));

      return data;
    }

    initAnime(data) {
      anime(data);

      let animeInstance = anime(data);

      return animeInstance;
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));