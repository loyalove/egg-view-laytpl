'use strict';

const laytpl = require('laytpl');

const RENDER = Symbol('LaytplView#_render');

module.exports = class LaytplView {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = ctx.app.config.ejs;
  }

  [RENDER](filename, locals, config) {
    return new Promise((resolve, reject) => {
      laytpl.renderFile(filename, locals, config, (err, result) => {
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
    const html = await this[RENDER](filename, locals, config);
    if (!config.layout) {
      return html;
    }

    locals.body = html;
    const layout = await this.app.view.resolve(config.layout);
    return this[RENDER](layout, locals, config);
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
