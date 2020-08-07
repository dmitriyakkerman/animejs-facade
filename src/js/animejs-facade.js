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
    translateX: '100%'
  }

  class AnimeFacade {
    constructor(targets, options = {}) {

      if(!targets) {
        throw new Error('No target selector');
      }

      if(!options.preset) {
        throw new Error('Choose preset for animation');
      }

      this.targets = targets;
      this.options = options || {};
      this.getChosenPreset(presets);
      this.initOnScroll();
    }

    initOnScroll() {

      let that = this;

      window.addEventListener('scroll', function() {
        that.targets.forEach(function(targetElement) {
          let windowHeight = window.innerHeight;
          let targetPosition = targetElement.getBoundingClientRect().top;
          if (targetPosition - windowHeight <= 0) {
            that.initAnime(targetElement, that.getChosenPreset(presets));
          }
        })
      })
    }

    getChosenPreset(presets) {

      let that = this;

      let matchedObject;

      for(let preset in presets) {
        if(presets.hasOwnProperty(preset)) {
          if(that.options.preset === preset) {
            matchedObject = JSON.stringify({ [preset]: presets[preset] });
          }
        }
      }
      return matchedObject;
    }

    initAnime(targetElement, preset) {

      let data = Object.assign({
        targets: targetElement
      }, JSON.parse(preset));

      anime(data);
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));