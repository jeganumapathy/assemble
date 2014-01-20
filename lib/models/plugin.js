/**
 * Assemble
 *
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var utils = require('../utils');
var logger = new require('../utils/log');
var log = new logger({
  level: logger.levels.info
});

var Plugin = module.exports = utils.model.inherit(require('./base'));

Plugin.prototype.initalize = function (options) {
  options = options || {};

  this.options = options.options;
  this.name = options.name;
  this.description = options.description;
  this.fn = options.fn;
  this.assemble = options.assemble;
};

Plugin.prototype.listen = function (stage) {
  this.assemble.on(stage, this.run.bind(this));
};

/**
 * Run the plugin when the event is emitted.
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
Plugin.prototype.run = function (params) {

  // add local properties to the params
  params = params.options || this.options || {};
  params = params.name || this.name || '';
  params = params.description || this.description || '';
  params = params.fn || this.fn || function () {};
  params = params.assemble || this.assemble;

  log.info('Plugin "' + this.name + '" starting...');
  this.fn.call(this.assemble, params, this.done.bind(this));
};

/**
 * Called when the plugin is finished
 * @param  {[type]}   err [description]
 * @return {Function}     [description]
 */
Plugin.prototype.done = function (err) {
  log.info(['Plugin "' + this.name + '" finished.']);
  if (err) {
    // do something
  }
  this.emit('done');
};