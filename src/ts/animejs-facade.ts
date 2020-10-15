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
        public targets: Array<string>;
        public eventType: string = 'load';
        public options: any;
        public preset: any;
        protected timeline: any;

        constructor(targets: string, options: any, eventType: string = 'load') {

            if(!targets) {
                throw new Error('No target selector');
            }

            if(!options.preset && !options.custom) {
                throw new Error('Choose animation preset or write custom params');
            }

            this.targets = [targets] as Array<string>;
            this.eventType = eventType;
            this.options = Object.assign(this, options);
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
            if(this.eventType === 'load') {
                this.initBase();
            }
        }

        protected initOnScroll(): void {
            let that = this;

            if(this.eventType === 'load') {
                window.addEventListener('scroll', function () {
                    that.initBase();
                })
            }
        }

        public play(): void {
            if(this.eventType === 'click') {
                this.initBase();
            }
        }

        protected getChosenPreset(): object {
            let chosenPreset;

            for (let preset in presets) {
                if(presets.hasOwnProperty(preset)) {
                    if(presets[this.preset.name as string]) {
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
                easing: (this.options.easing || defaults.easing) as string,
                duration: (this.options.duration || defaults.duration) as number | object | Function,
                delay: (this.options.delay || defaults.delay) as number | object | Function,
                direction: (this.options.direction || defaults.direction) as string,
                autoplay: (this.options.autoplay || defaults.autoplay) as boolean,
            };

            this.timeline = anime.timeline(timelineOptions);
        }

        protected setTargetSettings(target: string): void {
            let that = this;
            let targetSetting = {};

            if(that.options.custom as object) {
                that.mergeTimeline(target, that.options.custom.params as object);
            }
            else if(that.preset as object) {
                if(!(that.preset.params as object)) {
                    targetSetting = that.getChosenPreset();
                    that.mergeTimeline(target, targetSetting);
                }
                else {
                    targetSetting = Object.assign(that.getChosenPreset(), that.preset.params);
                    that.mergeTimeline(target, targetSetting, (that.preset.params.offset as any))
                }
            }
        }

        protected mergeTimeline(target: string, settings: object, offset: any = null): void {
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