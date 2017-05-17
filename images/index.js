const Model = require('./model');
const metaController = require('./controller');

module.exports = {
  Model,
  controller: metaController(Model),
};
