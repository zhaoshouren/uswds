
'use strict';


var DEFAULTS = {
  controlSelector: 'button',
  contentSelector: '.usa-accordion-content'
};

/**
 * Accordion
 *
 * @param $el {jQuery} Element to apply accordion to.
 * @param opts {Object} Options for the settings.
 */
function accordion($el, opts) {
  if (this instanceof accordion) {
    this.$root = $el;
    var $first = this.$root.find(this.controlSelector).first(),
        self = this;

    this.settings = $.extend({}, DEFAULTS, opts);
    this.controlSelector = this.settings.controlSelector;
    this.contentSelector = this.settings.contentSelector;
    this.hideAll();
    this.show($first);

    this.$root.find(this.controlSelector).on('click', function(ev) {
      ev.preventDefault();
      self.hideAll();
      self.show($(this));
    });
  } else {
    return new accordion($el, opts);
  }
}

accordion.prototype.hide = function($control) {
  var selector = $control.attr('aria-controls'),
      $content = this.$root.find('#' + selector);

  $control.attr('aria-expanded', false);
  $content.attr('aria-hidden', true);
}

accordion.prototype.show = function($control) {
  var selector = $control.attr('aria-controls'),
      $content = $('#' + selector);

  $control.attr('aria-expanded', true);
  $content.attr('aria-hidden', false);
}

accordion.prototype.hideAll = function() {
  var self = this;
  this.$root.find(this.controlSelector).each(function() {
    self.hide($(this));
  });
}

$(function() {
  $('.usa-accordion').each(function() {
    accordion($(this));
  });
});

(function() {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return accordion;
    });
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = accordion;
  }
  else {
    this.usa = this.usa || {};
    this.usa.accordion = accordion;
  }
}).call(this);
