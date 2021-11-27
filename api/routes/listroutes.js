'use strict';
module.exports = function(app) {
  var controller = require('../controllers/apicontroller');

  // controller Routes
  app.route('/api/getlist')
    .get(controller.list_all_tasks)
    .post(controller.create_a_task);


  app.route('/api/tasks/:taskId')
    .get(controller.read_a_task)
    .put(controller.update_a_task)
    .delete(controller.delete_a_task);

  app.route('/api/pinlist/:channelid')
    .get(controller.pinlist)
};