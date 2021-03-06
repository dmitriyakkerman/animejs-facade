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
            this.initOnLoad();
            this.initOnScroll();
        }

        protected initBase(): void {
            let that = this;

            that.targets.forEach(function(targetElement: string) {
                let node = document.querySelector(targetElement) as HTMLElement;

                if(!node.classList.contains('animated')) {
                    let windowHeight = AnimeFacade.windowHeight;
                    let targetPosition = node.getBoundingClientRect().top;
                    if (targetPosition - windowHeight <= 0) {
                        that.initTimeline(targetElement);
                        node.classList.add('animated');
                    }
                }
            })
        }

        protected initOnLoad(): void {
            if(this.options.autoplay || typeof this.options.autoplay === 'undefined') {
                this.initBase();
            }
        }

        protected initOnScroll(): void {
            let that = this;

            if(this.options.autoplay || typeof this.options.autoplay === 'undefined') {
                window.addEventListener('scroll', function () {
                    that.initBase();
                })
            }
        }

        public play(): void {
            if(!this.options.autoplay) {
                this.initBase();
            }
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

        protected setTimelineOptions(): void {
            let timelineOptions: any = {
                easing: (this.options.easing || defaults.easing) as string,
                duration: (this.options.duration || defaults.duration) as number | object | Function,
                delay: (this.options.delay || defaults.delay) as number | object | Function,
                direction: (this.options.direction || defaults.direction) as string,
                autoplay: ((this.options.autoplay || typeof this.options.autoplay === 'undefined') || defaults.autoplay) as boolean,
            };

            AnimeFacade.timeline = anime.timeline(timelineOptions);
        }

        protected setTargetSettings(target: string): void {
            let that = this;
            let targetSetting = {};

            if(that.options.custom as object) {
                AnimeFacade.mergeTimeline(target, (that.options.custom as CustomOptions).params as object);
            }
            else if(that.options.preset as object) {
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

        static mergeTimeline(target: string, settings: object, offset: string | number = 0): void {
            AnimeFacade.timeline.add(Object.assign({ targets: target } as object, settings), offset);
        }

        protected initTimeline(target: string): void {
            this.setTimelineOptions();
            this.setTargetSettings(target);
        }
    }

    window.AnimeFacade = AnimeFacade;

    return AnimeFacade;
}));