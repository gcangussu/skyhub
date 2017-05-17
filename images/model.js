const mongoose = require('mongoose');

const { SIZES_NAMES } = require('../constants');


const schema = SIZES_NAMES.reduce(
  (obj, sizeName) => Object.assign(obj, { [sizeName]: String }),
  { name: String });

const Image = mongoose.model('Image', schema);

module.exports = Image;
