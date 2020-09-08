import {presets} from "./presets";
import {defaults} from "./defaults";

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
      this.onInit();
    }

    onInit() {
        this.initOnScroll();
        this.initOnLoad();
    }

    setTimelineOptions() {

        let that = this;

        let timeline = anime.timeline({
            easing: that.options.easing || defaults.easing,
            duration: that.options.duration || defaults.duration
        })
        
        this.targets.forEach(function (target) {
            timeline.add({
                targets: target,
                translateX: 550,
            })
        })
    }

    initTimeline() {

        let that = this;

        let isBlocked = true;

        document.querySelectorAll(that.targets).forEach(function(targetElement) {
            let windowHeight = window.innerHeight;
            let targetPosition = targetElement.getBoundingClientRect().top;
            if (targetPosition - windowHeight <= 0) {
                if(isBlocked) {
                    that.setTimelineOptions();
                    isBlocked = false;
                }
                isBlocked = false;
            }
        })
    }

    initOnLoad() {
        this.initTimeline();
    }

    initOnScroll() {

      let that = this;

      window.addEventListener('scroll', function() {
        that.initTimeline();
      })
    }
  }

  window.AnimeFacade = AnimeFacade;

  return AnimeFacade;

}));