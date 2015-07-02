'use strict';

/* globals $: false */

var usa = usa || {};

(function() {
  /**
   * Accordion
   *
   * An accordion component.
   *
   * @param {jQuery} $el A jQuery html element to turn into an accordion.
   */
  function Accordion($el) {
    var self = this;
    this.$root = $el;
    this.$root.on('click', 'button', function(ev) {
      ev.preventDefault();
      self.hideAll();
      self.show($(this));
      self.$root.trigger(Accordion.EV_TAB_OPEN, $(this));
    });
  }

  Accordion.EV_TAB_OPEN = 'accordion-event-tab_open';

  Accordion.prototype.$ = function(selector) {
    return this.$root.find(selector);
  };

  Accordion.prototype.on = function(event, cb) {
    return this.$root.on(event, cb);
  };

  Accordion.prototype.destroy = function() {
    this.$root.off();
    this.$root.remove();
  };

  Accordion.prototype.hide = function($button) {
    var selector = $button.attr('aria-controls'),
        $content = this.$('#' + selector);

    $button.attr('aria-expanded', false);
    $content.attr('aria-hidden', true);
  };

  Accordion.prototype.show = function($button) {
    var selector = $button.attr('aria-controls'),
        $content = this.$('#' + selector);

    $button.attr('aria-expanded', true);
    $content.attr('aria-hidden', false);
  };

  Accordion.prototype.hideAll = function() {
    var self = this;
    this.$('button').each(function() {
      self.hide($(this));
    });
  };
  usa.Accordion = Accordion;

  /**
   * accordion
   *
   * Initialize a new Accordion component.
   *
   * @param {jQuery} $el A jQuery html element to turn into an accordion.
   */
  function accordion($el) {
    return new Accordion($el);
  }
  usa.accordion = accordion;

}).call(this);

$(function() {
  $('.usa-accordion').each(function() {
    var a = usa.accordion($(this));
    a.on(usa.Accordion.EV_TAB_OPEN, function(ev, $control) {
      console.log('event tab open', ev, $control);
    });
  });
});
