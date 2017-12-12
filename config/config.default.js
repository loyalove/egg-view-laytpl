'use strict';

const path = require('path');

module.exports = appInfo => {
  return {
    /**
     * @member Config#laytpl
     * @property {String} [root=${baseDir}/app/view] - the root directory of laytpl files
     * @property {Boolean} [cache=true] - compiled functions are cached, only work using `ctx.render`
     * @property {Boolean} [debug=false] - output generated function body
     * @property {Boolean} [compileDebug=true] - when false no debug instrumentation is compiled
     * @property {String} [delimiter] - character to use with angle brackets for open/close
     * @property {Boolean} [strict=false] - when set to true, generated function is in strict mode
     */
    laytpl: {
      root: path.join(appInfo.baseDir, 'app/view'),
      cache: true,
      debug: false,
      compileDebug: true,
      delimiter: null,
      strict: false,
    },
  };
};
