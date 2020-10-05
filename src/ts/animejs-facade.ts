import {define} from "./globals/globals";
import {windowAnimeFacadeInterface} from "./interfaces/windowAnimeFacadeInterface";

declare let window: windowAnimeFacadeInterface;

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
    targets: Array<string>;
    options: any;
    preset: any;
    timeline: any;

    constructor(targets: string, options: any) {

      if(!targets) {
        throw new Error('No target selector');
      }

      if(!options.preset && !options.custom) {
        throw new Error('Choose animation preset or write custom params');
      }

      this.targets = [targets] as Array<string>;
      this.options = options || {} as object;
      this.preset = options.preset || {} as object;
      this.onInit();
    }

    protected onInit(): void {
        this.initOnLoad();
        this.initOnScroll();
    }

    protected initBase(): void {
        let that = this;

        that.targets.forEach(function(targetElement: string) {
            let node = document.querySelector(targetElement) as HTMLElement;

            if(!node.classList.contains('animated')) {
                let windowHeight = window.innerHeight;
                let targetPosition = node.getBoundingClientRect().top;
                if (targetPosition - windowHeight <= 0) {
                    window.requestAnimationFrame(function() {
                      that.initTimeline(targetElement);
                    });
                    node.classList.add('animated');
                }
            }
        })
    }

    protected initOnLoad(): void {
       this.initBase();
    }

    protected initOnScroll(): void {
        let that = this;

        window.addEventListener('scroll', function() {
          that.initBase();
        })
    }

    protected getChosenPreset(): object {
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

    protected setTimelineOptions(): void {

        let timelineOptions: any = {
            easing: this.options.easing || defaults.easing,
            duration: this.options.duration || defaults.duration,
            delay: this.options.delay || defaults.delay,
            direction: this.options.direction || defaults.direction,
            autoplay: this.options.autoplay || defaults.autoplay,
        }

        this.timeline = anime.timeline(timelineOptions);
    }

    protected setTargetSettings(target: string): void {
        let that = this;
        let targetSetting = {};

        if(that.options.custom) {
            that.mergeTimeline(target, that.options.custom.params);
        }
        else if(that.preset) {
            if(!that.preset.params) {
                targetSetting = that.getChosenPreset();
                that.mergeTimeline(target, targetSetting);
            }
            else {
                targetSetting = Object.assign(that.getChosenPreset(), that.preset.params);
                that.mergeTimeline(target, targetSetting, that.preset.params.offset)
            }
        }
    }

    protected mergeTimeline(target: string, settings: object, offset: string | number | null = null): void {
        this.timeline.add(Object.assign({ targets: target } as any, settings), offset);
    }

    protected initTimeline(target: string): void {
        this.setTimelineOptions();
        this.setTargetSettings(target);
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;
}));