import {defaults} from "./defaults";
import {presets} from "./presets";
import {easings} from "./easings";

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

        document.querySelectorAll(that.targets).forEach(function(targetElement) {
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

        let that = this;

        let validEasing;
        let easing = that.options.easing;

        if(easing) {
            if(easing.indexOf("-") > -1) {
                let splittedString = easing.split('-');
                splittedString = splittedString.map(function (string, stringIndex) {
                    if(stringIndex !== 0) {
                        return string[0].toUpperCase() + string.slice(1);
                    }

                    return string;
                });

                validEasing = splittedString.join('')
            }
            else {
                validEasing = easing;
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

        let that = this;

        this._timeline = anime.timeline({
            easing: that._getChosenEasing(),
            duration: that.options.duration || defaults.duration,
            delay: that.options.delay || defaults.delay,
            loop: that.options.loop || defaults.loop,
            direction: that.options.direction || defaults.direction,
            autoplay: that.options.autoplay || defaults.autoplay
        });
    }

    _setTimelineAnimations() {

        let that = this;

        if(that._checkCustomizedParams()) {
            this.targets.forEach(function (target, targetIndex) {
                that._checkCustomizedParams().forEach(function(customizedParams, customizedParamsIndex) {
                    that._getChosenPreset().forEach(function(chosenPreset) {
                        for(let customizedParam in customizedParams) {
                            if(customizedParams.hasOwnProperty(customizedParam)) {
                                for(let preset in chosenPreset) {
                                    if(chosenPreset.hasOwnProperty(preset)) {
                                        if(customizedParam === preset && targetIndex === customizedParamsIndex) {
                                            that._mergeTimelineOptions(target, customizedParams)
                                        }
                                    }
                                }
                            }
                        }
                    })
                })
            })
        }
        else {
            this.targets.forEach(function (target, targetIndex) {
                that._getChosenPreset().forEach(function(chosenPreset, chosenPresetIndex) {
                    if(targetIndex === chosenPresetIndex) {
                        that._mergeTimelineOptions(target, chosenPreset)
                    }
                })
            })
        }
    }

    _mergeTimelineOptions(target, presets) {

        let that = this;

        that._timeline.add(
            Object.assign({
                targets: target
            }, presets)
        )
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));