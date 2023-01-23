const { connect } = require('mongoose');
const { databaseUrl } = require('./conf');
const { createMainStatuses } = require('../services/statuses');
const db = connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));
createMainStatuses();
module.exports = db;
