const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  weight: {
    type: Number,
    required: true,
    default: 0,
  },
  color: {
    type: String,
    required: true,
  },
});
const status = mongoose.model('status', StatusSchema);
module.exports = status;
