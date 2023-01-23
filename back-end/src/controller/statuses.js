const statuses = require('../services/statuses');
async function getMultiple(req, res, next) {
  try {
    res.json(await statuses.getMultiple());
  } catch (err) {
    console.error(`Error while getting statuses`, err.message);
    next(err);
  }
}
async function getSingle(req, res, next) {
  try {
    res.json(await statuses.getSingle(req.params.id));
  } catch (err) {
    console.error(`Error while getting status`, err.message);
    next(err);
  }
}
async function create(req, res, next) {
  try {
    console.log(req.body);
    res.json(await statuses.create(req.body));
  } catch (err) {
    console.error(`Error while creating status`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await statuses.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating status`, err.message);
    next(err);
  }
}

async function updateManyStatuses(req, res, next) {
  try {
    res.json(await statuses.updateManyStatuses(req.body));
  } catch (err) {
    console.error(`Error while updating status`, err.message);
    next(err);
  }
}

module.exports = {
  getMultiple,
  create,
  update,
  getSingle,
  updateManyStatuses,
};
