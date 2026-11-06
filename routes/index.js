const createAction = require('./create');
const readAction = require('./read');
const deleteAction = require('./delete');
const updateAction = require('./update');

module.exports = (app, db) => {
  // Для каждой action
  createAction(app, db);
  readAction(app, db);
  deleteAction(app, db);
  updateAction(app, db);
};