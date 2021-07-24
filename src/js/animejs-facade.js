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
            if (!targets) {
                throw new Error('No target selector');
            }
            if (!options.preset && !options.custom) {
                throw new Error('Choose animation preset or write custom params');
            }
            this.targets = [targets];
            this.options = options;
            this.onInit();
        }
        onInit() {
            this.initOnLoad();
            this.initOnScroll();
        }
        initBase() {
            let that = this;
            that.targets.forEach(function (targetElement) {
                let observer = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (!entry.target.classList.contains('animated')) {
                                let windowHeight = AnimeFacade.windowHeight;
                                let targetPosition = entry.target.getBoundingClientRect().top;
                                if (targetPosition - windowHeight <= 0) {
                                    that.initTimeline(entry.target);
                                    entry.target.classList.add('animated');
                                }
                            }
                        }
                    });
                }, {
                    rootMargin: '0px',
                    threshold: 0
                });
                let targets = document.querySelectorAll(targetElement);
                targets.forEach(function (target) {
                    observer.observe(target);
                });
            });
        }
        initOnLoad() {
            if (this.options.autoplay || typeof this.options.autoplay === 'undefined') {
                this.initBase();
            }
        }
        initOnScroll() {
            let that = this;
            if (this.options.autoplay || typeof this.options.autoplay === 'undefined') {
                window.addEventListener('scroll', function () {
                    that.initBase();
                });
            }
        }
        play() {
            if (!this.options.autoplay) {
                this.initBase();
            }
        }
        getChosenPreset() {
            let chosenPreset;
            for (let preset in presets) {
                if (presets.hasOwnProperty(preset)) {
                    if (presets[this.options.preset.name]) {
                        chosenPreset = presets[this.options.preset.name];
                    }
                    else {
                        throw new Error(`Chosen preset "${this.options.preset.name}" doesn\'t exist`);
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
                autoplay: ((this.options.autoplay || typeof this.options.autoplay === 'undefined') || defaults.autoplay),
            };
            AnimeFacade.timeline = anime.timeline(timelineOptions);
        }
        setTargetSettings(target) {
            let that = this;
            let targetSetting = {};
            if (that.options.custom) {
                AnimeFacade.mergeTimeline(target, that.options.custom.params);
            }
            else if (that.options.preset) {
                if (!that.options.preset.params) {
                    targetSetting = that.getChosenPreset();
                    AnimeFacade.mergeTimeline(target, targetSetting);
                }
                else {
                    targetSetting = Object.assign(that.getChosenPreset(), that.options.preset.params);
                    AnimeFacade.mergeTimeline(target, targetSetting, that.options.preset.params.offset);
                }
            }
        }
        static mergeTimeline(target, settings, offset = 0) {
            AnimeFacade.timeline.add(Object.assign({ targets: target }, settings), offset);
        }
        initTimeline(target) {
            this.setTimelineOptions();
            this.setTargetSettings(target);
        }
    }
    AnimeFacade.windowHeight = window.innerHeight;
    window.AnimeFacade = AnimeFacade;
    return AnimeFacade;
}));
