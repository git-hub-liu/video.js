// Fake a media playback tech controller so that player tests
// can run without HTML5 or Flash, of which PhantomJS supports neither.

var MediaTechController = vjs.MediaTechController;

/**
 * @constructor
 */
vjs.MediaFaker = MediaTechController.extend({
  init: function(player, options, onReady){
    MediaTechController.call(this, player, options, onReady);

    this.triggerReady();
  }
});

// Support everything except for "video/unsupported-format"
vjs.MediaFaker.isSupported = function(){ return true; };
vjs.MediaFaker.canPlaySource = function(srcObj){ return srcObj.type !== 'video/unsupported-format'; };

vjs.MediaFaker.prototype.createEl = function(){
  var el = MediaTechController.prototype.createEl.call(this, 'div', {
    className: 'vjs-tech'
  });
  if (this.player().poster()) {
    // transfer the poster image to mimic HTML
    el.poster = this.player().poster();
  }

  vjs.Lib.insertFirst(el, this.player_.el());

  return el;
};

// fake a poster attribute to mimic the video element
vjs.MediaFaker.prototype.poster = function(){ return this.el().poster; };
vjs.MediaFaker.prototype['setPoster'] = function(val){ this.el().poster = val; };

vjs.MediaFaker.prototype.currentTime = function(){ return 0; };
vjs.MediaFaker.prototype.seeking = function(){ return false; };
vjs.MediaFaker.prototype.src = function(){ return 'movie.mp4'; };
vjs.MediaFaker.prototype.volume = function(){ return 0; };
vjs.MediaFaker.prototype.muted = function(){ return false; };
vjs.MediaFaker.prototype.pause = function(){ return false; };
vjs.MediaFaker.prototype.paused = function(){ return true; };
vjs.MediaFaker.prototype.play = function() {
  this.player().trigger('play');
};
vjs.MediaFaker.prototype.supportsFullScreen = function(){ return false; };
vjs.MediaFaker.prototype.buffered = function(){ return {}; };
vjs.MediaFaker.prototype.duration = function(){ return {}; };
vjs.MediaFaker.prototype.networkState = function(){ return 0; };
vjs.MediaFaker.prototype.readyState = function(){ return 0; };

// Export vars for Closure Compiler
vjs['MediaFaker'] = vjs.MediaFaker;
vjs['MediaFaker']['isSupported'] = vjs.MediaFaker.isSupported;
vjs['MediaFaker']['canPlaySource'] = vjs.MediaFaker.canPlaySource;
