const defaults = require('./defaults');
const presets = require('./presets');
const easings = require('./easings');

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
      this._timeline = null;
      this._onInit();
    }

    _onInit() {
        this._initOnScroll();
        this._initOnLoad();
    }

    _initBase() {
        let that = this;

        document.querySelectorAll(this.targets).forEach(function(targetElement) {
            let windowHeight = window.innerHeight;
            let targetPosition = targetElement.getBoundingClientRect().top;
            if (targetPosition - windowHeight <= 0 && !targetElement.classList.contains('animated')) {
                that._initTimeLine();
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

    _getChosenEasing() {
        let that = this;
        let chosenEasing;

        easings.forEach(function (easing) {
            for(let e in easing) {
                if(easing.hasOwnProperty(e)) {
                    if(that._validateChosenEasing() === e) {
                        chosenEasing = easing[e];
                    }
                }
            }
        });

        return chosenEasing;
    }

    _validateChosenEasing() {
        let validEasing;

        if(this.options.easing) {
            if(this.options.easing.indexOf("-") > -1) {
                let splittedString = this.options.easing.split('-');
                splittedString = splittedString.map(function (string, stringIndex) {
                    if(stringIndex !== 0) {
                        return string[0].toUpperCase() + string.slice(1);
                    }

                    return string;
                });

                validEasing = splittedString.join('')
            }
            else {
                validEasing = this.options.easing;
            }
        }

        return validEasing;
    }

    _checkCustomizedParams() {
        return this.preset.params;
    }

    _initTimeLine() {
        this._setDefaultTimelineOptions();
        this._setTimelineAnimations();
    }

    _setDefaultTimelineOptions() {
        this._timeline = anime.timeline({
            easing: this._getChosenEasing() || defaults.easing,
            duration: this.options.duration || defaults.duration,
            delay: this.options.delay || defaults.delay,
            loop: this.options.loop || defaults.loop,
            direction: this.options.direction || defaults.direction,
            autoplay: this.options.autoplay || defaults.autoplay
        });
    }

    _setTimelineAnimations() {
        if(this._checkCustomizedParams()) {
            this._setTimelineFromCustomizedParams();
        }
        else {
            this._setTimelineFromChosenPreset();
        }
    }

      _setTimelineFromCustomizedParams() {
          let that = this;

          this.targets.forEach(function (target, targetIndex) {
              that._checkCustomizedParams().forEach(function(customizedParams, customizedParamsIndex) {
                  that._getChosenPreset().forEach(function(chosenPreset) {
                      for(let customizedParam in customizedParams) {
                          if(customizedParams.hasOwnProperty(customizedParam)) {
                              for(let preset in chosenPreset) {
                                  if(chosenPreset.hasOwnProperty(preset)) {
                                      if(customizedParam === preset && targetIndex === customizedParamsIndex) {
                                          that._mergeTimelineOptions(target, customizedParams, customizedParams['offset'])
                                      }
                                  }
                              }
                          }
                      }
                  })
              })
          })
      }

    _setTimelineFromChosenPreset() {
        let that = this;

        this.targets.forEach(function (target, targetIndex) {
            that._getChosenPreset().forEach(function(chosenPreset, chosenPresetIndex) {
                if(targetIndex === chosenPresetIndex) {
                    that._mergeTimelineOptions(target, chosenPreset)
                }
            })
        })
    }

    _mergeTimelineOptions(target, presets, offset) {
        this._timeline.add(
            Object.assign({
                targets: target
            }, presets), offset
        )
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));