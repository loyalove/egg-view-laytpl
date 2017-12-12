'use strict';

const laytpl = require('laytpl');

module.exports = class LaytplView {
  render(filename, locals) {
    return new Promise((resolve, reject) => {
      // 异步调用 API
      laytpl.renderFile(filename, locals, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  renderString(tpl, locals) {
    try {
      // 同步调用 API
      return Promise.resolve(laytpl.render(tpl, locals));
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
