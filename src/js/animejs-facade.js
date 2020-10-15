"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals/globals");
const anime = require('../js/anime.min');
const defaults = require('../js/defaults');
const presets = require('../js/presets');
(function (root, factory) {
    if (typeof globals_1.define === 'function' && globals_1.define.amd) {
        globals_1.define([], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
    else {
        root.AnimeFacade = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class AnimeFacade {
        constructor(targets, options) {
            this.onLoad = true;
            if (!targets) {
                throw new Error('No target selector');
            }
            if (!options.preset && !options.custom) {
                throw new Error('Choose animation preset or write custom params');
            }
            this.targets = [targets];
            this.onLoad = options.onLoad || true;
            this.options = Object.assign(this, options);
            this.preset = options.preset || {};
            this.onInit();
        }
        onInit() {
            this.initOnLoad();
            this.initOnScroll();
        }
        initBase() {
            let that = this;
            that.targets.forEach(function (targetElement) {
                let node = document.querySelector(targetElement);
                if (!node.classList.contains('animated')) {
                    let windowHeight = window.innerHeight;
                    let targetPosition = node.getBoundingClientRect().top;
                    if (targetPosition - windowHeight <= 0) {
                        window.requestAnimationFrame(function () {
                            that.initTimeline(targetElement);
                        });
                        node.classList.add('animated');
                    }
                }
            });
        }
        initOnLoad() {
            if (this.options.onLoad) {
                this.initBase();
            }
        }
        initOnScroll() {
            let that = this;
            if (this.options.onLoad) {
                window.addEventListener('scroll', function () {
                    that.initBase();
                });
            }
        }
        play() {
            if (!this.options.onLoad) {
                this.initBase();
            }
        }
        getChosenPreset() {
            let chosenPreset;
            for (let preset in presets) {
                if (presets.hasOwnProperty(preset)) {
                    if (presets[this.preset.name]) {
                        chosenPreset = presets[this.preset.name];
                    }
                    else {
                        throw new Error(`Chosen preset "${this.preset.name}" doesn\'t exist`);
                    }
                }
            }
            return chosenPreset;
        }
        setTimelineOptions() {
            let timelineOptions = {
                easing: (this.options.easing || defaults.easing),
                duration: (this.options.duration || defaults.duration),
                delay: (this.options.delay || defaults.delay),
                direction: (this.options.direction || defaults.direction),
                autoplay: (this.options.autoplay || defaults.autoplay),
            };
            this.timeline = anime.timeline(timelineOptions);
        }
        setTargetSettings(target) {
            let that = this;
            let targetSetting = {};
            if (that.options.custom) {
                that.mergeTimeline(target, that.options.custom.params);
            }
            else if (that.preset) {
                if (!that.preset.params) {
                    targetSetting = that.getChosenPreset();
                    that.mergeTimeline(target, targetSetting);
                }
                else {
                    targetSetting = Object.assign(that.getChosenPreset(), that.preset.params);
                    that.mergeTimeline(target, targetSetting, that.preset.params.offset);
                }
            }
        }
        mergeTimeline(target, settings, offset = null) {
            this.timeline.add(Object.assign({ targets: target }, settings), offset);
        }
        initTimeline(target) {
            this.setTimelineOptions();
            this.setTargetSettings(target);
        }
    }
    window.AnimeFacade = AnimeFacade;
    return AnimeFacade;
}));
