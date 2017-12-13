'use strict';

const laytpl = require('laytpl');
const RENDER = Symbol('LaytplView#_render');

module.exports = class LaytplView {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = ctx.app.config.laytpl;
  }

  [RENDER](filename, locals, config) {
    laytpl.config(config);
    return new Promise((resolve, reject) => {
      laytpl.renderFile(filename, locals, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async render(filename, locals, viewOptions) {
    const config = Object.assign({}, this.config, viewOptions, { filename });
    return this[RENDER](filename, locals, config);
  }

  renderString(tpl, locals, viewOptions) {
    // should disable cache when no filename
    const config = Object.assign({}, this.config, viewOptions, { cache: null });
    try {
      return Promise.resolve(laytpl.render(tpl, locals, config));
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
