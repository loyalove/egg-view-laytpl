'use strict';

module.exports = app => {
  app.view.use('laytpl', require('./lib/view'));
};
