import {define} from "./globals/globals";
import {windowAnimeFacadeInterface} from "./interfaces/windowAnimeFacadeInterface";
import {AnimeFacadeOptions} from "./types/AnimeFacadeOptions";
import {PresetOptions} from "./types/PresetOptions";
import {CustomOptions} from "./types/СustomOptions";
import {TimelineOptions} from "./types/TimelineOptions";

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
        public targets: Array<string>;
        public options: AnimeFacadeOptions;
        static timeline: TimelineOptions;
        static windowHeight = window.innerHeight as number;

        constructor(targets: string, options: AnimeFacadeOptions) {

            if(!targets) {
                throw new Error('No target selector');
            }

            if(!options.preset && !options.custom) {
                throw new Error('Choose animation preset or write custom params');
            }

            this.targets = [targets] as Array<string>;
            this.options = options;
            this.onInit();
        }

        protected onInit(): void {
            if(this.options.autoplay || typeof this.options.autoplay === 'undefined') {
                this.initBase();
            }
        }

        protected initBase(): void {
            let that = this;

            that.targets.forEach(function(targetElement: string) {
                let observer = new IntersectionObserver(
                    function(entries, observer) {
                        entries.forEach((entry, index) => {
                            if(entry.intersectionRatio > 0) {
                                if(!entry.target.classList.contains('animated')) {
                                    that.initTimeline(entry.target, index);
                                    entry.target.classList.add('animated');
                                }
                            }
                        });
                    },
                    {
                        rootMargin: that.options.rootMargin || defaults.rootMargin,
                        threshold: that.options.threshold || defaults.threshold
                    });

                let targets = document.querySelectorAll(targetElement);
                targets.forEach(function(target) {
                    observer.observe(target);
                });

            })
        }

        protected getChosenPreset(): object {
            let chosenPreset;

            for (let preset in presets) {
                if(presets.hasOwnProperty(preset)) {
                    if(presets[(this.options.preset as PresetOptions).name as string]) {
                        chosenPreset = presets[(this.options.preset as PresetOptions).name];
                    }
                    else {
                        throw new Error(`Chosen preset "${(this.options.preset as PresetOptions).name}" doesn\'t exist`)
                    }
                }
            }

            return chosenPreset;
        }

        protected setTimelineOptions(index: Number): void {
            let timelineOptions: any = {
                easing: (this.options.easing || defaults.easing) as string,
                duration: (this.options.duration || defaults.duration) as number | object | Function,
                delay: (typeof this.options.delay === 'function' ? this.options.delay(index) : defaults.delay) as number | Function,
                direction: (this.options.direction || defaults.direction) as string,
                autoplay: ((this.options.autoplay || typeof this.options.autoplay === 'undefined') || defaults.autoplay) as boolean,
            };

            AnimeFacade.timeline = anime.timeline(timelineOptions);
        }

        protected setTargetSettings(target: Element): void {
            let that = this;
            let targetSetting = {};

            if(that.options.custom as object) {
                AnimeFacade.mergeTimeline(target, (that.options.custom as CustomOptions).params as object);
            }

            if (that.options.preset as object) {
                if(!((that.options.preset as PresetOptions).params as object)) {
                    targetSetting = that.getChosenPreset();
                    AnimeFacade.mergeTimeline(target, targetSetting);
                }
                else {
                    targetSetting = Object.assign(that.getChosenPreset(), (that.options.preset as PresetOptions).params);
                    AnimeFacade.mergeTimeline(target, targetSetting, ((that.options.preset as PresetOptions).params.offset as string | number))
                }
            }
        }

        static mergeTimeline(target: Element, settings: object, offset: string | number = 0): void {
            AnimeFacade.timeline.add(Object.assign({ targets: target } as object, settings), offset);
        }

        protected initTimeline(target: Element, index: Number): void {
            this.setTimelineOptions(index);
            this.setTargetSettings(target);
        }
    }

    window.AnimeFacade = AnimeFacade;

    return AnimeFacade;
}));