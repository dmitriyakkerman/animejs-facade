const defaults = require('./defaults');
const presets = require('./presets');

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

        if(!options.preset) {
            throw new Error('Choose animation preset');
        }

      this.targets = targets;
      this.options = options;
      this.preset = options.preset || {};
      this.timeline = null;
      this._onInit();
    }

    _onInit() {
        this._initOnLoad();
        this._initOnScroll();
    }

    _initBase() {
        let that = this;

        document.querySelectorAll(that.targets).forEach(function(targetElement) {
            if(!targetElement.classList.contains('animated')) {
                let windowHeight = window.innerHeight;
                let targetPosition = targetElement.getBoundingClientRect().top;
                if (targetPosition - windowHeight <= 0) {
                    that._initTimeline();
                    targetElement.classList.add('animated');
                }
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
        this.timeline = anime.timeline({
            easing: this.options.easing || defaults.easing,
            duration: this.options.duration || defaults.duration,
            delay: this.options.delay || defaults.delay,
            direction: this.options.direction || defaults.direction,
            autoplay: this.options.autoplay || defaults.autoplay,
        })
    }

    _setTargetSettings() {
        let that = this;
        let targetSetting = {};

        that.targets.forEach(function (target) {
            if(!that.preset.params) {
                targetSetting = that._getChosenPreset();
                that._mergeTimeline(target, targetSetting);
            }
            else {
                targetSetting = Object.assign(that._getChosenPreset(), that.preset.params);
                that._mergeTimeline(target, targetSetting, that.preset.params.offset)
            }
        })
    }

    _mergeTimeline(target, settings, offset = null) {
        this.timeline.add(
            Object.assign({
                    targets: target
                },
                settings
            ), offset
        )
    }

    _initTimeline() {
        this._setTimelineOptions();
        this._setTargetSettings();
    }

  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));