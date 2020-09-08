import {presets} from "./presets";
import {defaults} from "./defaults";

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
    constructor(targets, options = {}) {

      if(!targets) {
        throw new Error('No target selector');
      }

      this.targets = targets;
      this.options = options;
      this.preset = options.preset || {};
      this._onInit();
    }

    _onInit() {
        this._getChosenPreset();
        this._initOnScroll();
        this._initOnLoad();
    }

    _initBase() {

        let that = this;

        document.querySelectorAll(that.targets).forEach(function(targetElement) {
            let windowHeight = window.innerHeight;
            let targetPosition = targetElement.getBoundingClientRect().top;
            if (targetPosition - windowHeight <= 0 && !targetElement.classList.contains('animated')) {
                that._setTimelineOptions();
                targetElement.classList.add('animated');
            }
        })
    }

    _initOnLoad() {
        this._initBase();
    }

    _initOnScroll() {

        let that = this;

        window.addEventListener('scroll', function() {
            that._initBase();
        })
    }

    _getChosenPreset() {

        let chosenPreset;

        for (let preset in presets) {
            if(presets.hasOwnProperty(preset)) {
                if(this.preset.name === preset) {
                    chosenPreset = presets[preset]
                }
            }
        }

        return chosenPreset;
    }

    _setTimelineOptions() {

        let that = this;

        let timeline = anime.timeline({
            easing: that.options.easing || defaults.easing,
            duration: that.options.duration || defaults.duration,
            delay: that.options.delay || defaults.delay,
            loop: that.options.loop || defaults.loop,
            direction: that.options.direction || defaults.direction,
            autoplay: that.options.autoplay || defaults.autoplay
        })

        this.targets.forEach(function (target, targetIndex) {

            that._getChosenPreset().forEach(function(preset, presetIndex) {

                if(targetIndex === presetIndex) {

                    timeline.add(
                        Object.assign({
                            targets: target
                        }, preset)
                    )
                }

            })
        })
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));