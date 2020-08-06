(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AnimeFacade = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  class AnimeFacade {
    constructor(targets, options) {

      if(!targets) {
        throw new Error('No target selector')
      }

      this.targets = targets;
      this.options = options || {};
      this.getTargetOnScroll();
      this.getPresets();
      this.getPresetValue();
    }

    getTargetOnScroll() {

      let that = this;

      window.addEventListener('scroll', function() {
        that.targets.forEach(function(targetElement) {
          let windowHeight = window.innerHeight;
          let targetPosition = targetElement.getBoundingClientRect().top;
          if (targetPosition - windowHeight <= 0) {
            that.initAnime(targetElement, that.getPresetValue());
          }
        })
      })
    }

    getPresets() {

      let presets = {
        translateX: '100%'
      }

      return presets;
    }

    getPresetValue() {

      let that = this;

      let matchedObject;

        for(let preset in that.getPresets()) {
          if(that.getPresets().hasOwnProperty(preset)) {
           matchedObject = JSON.stringify({ [preset]: that.getPresets()[preset] });
          }
      }
      return matchedObject;
    }

    initAnime(targetElement, preset) {

      let that = this;

      let a = Object.assign({
        targets: targetElement
      }, JSON.parse(preset));

      anime(a);
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));