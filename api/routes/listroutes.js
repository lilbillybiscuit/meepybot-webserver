'use strict';
module.exports = function(app) {
  var controller = require('../controllers/apicontroller');

  // controller Routes
  app.route('/api/getlist')
    .get(controller.list_all_tasks)

  app.route('/api/pinlist/:channelid')
    .get(controller.pinlist)
};