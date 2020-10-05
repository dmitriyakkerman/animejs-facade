const anime = require('../js/anime.min');
const defaults = require('../js/defaults');
const presets = require('../js/presets');

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

      if(!options.preset && !options.custom) {
        throw new Error('Choose animation preset or write custom params');
      }

      this.targets = [targets];
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

        that.targets.forEach(function(targetElement) {
            let node = document.querySelector(targetElement);

            if(!node.classList.contains('animated')) {
                let windowHeight = window.innerHeight;
                let targetPosition = node.getBoundingClientRect().top;
                if (targetPosition - windowHeight <= 0) {
                    window.requestAnimationFrame(function() {
                      that._initTimeline(targetElement);
                    });
                    node.classList.add('animated');
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
                if(presets[this.preset.name]) {
                    chosenPreset = presets[this.preset.name];
                }
                else {
                    throw new Error(`Chosen preset "${this.preset.name}" doesn\'t exist`)
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
        });
    }

    _setTargetSettings(target) {
        let that = this;
        let targetSetting = {};

        if(that.options.custom) {
            that._mergeTimeline(target, that.options.custom.params);
        }
        else if(that.preset) {
            if(!that.preset.params) {
                targetSetting = that._getChosenPreset();
                that._mergeTimeline(target, targetSetting);
            }
            else {
                targetSetting = Object.assign(that._getChosenPreset(), that.preset.params);
                that._mergeTimeline(target, targetSetting, that.preset.params.offset)
            }
        }
    }

    _mergeTimeline(target, settings, offset = null) {
        this.timeline.add(Object.assign({ targets: target }, settings), offset);
    }

    _initTimeline(target) {
        this._setTimelineOptions();
        this._setTargetSettings(target);
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;
}));