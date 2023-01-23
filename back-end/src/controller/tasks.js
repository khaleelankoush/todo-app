const tasks = require('../services/tasks');
async function getMultiple(req, res, next) {
  try {
    res.json(await tasks.getMultiple(req.query));
  } catch (err) {
    console.error(`Error while getting tasks`, err.message);
    next(err);
  }
}
async function getSingle(req, res, next) {
    try {
      res.json(await tasks.getSingle(req.params.id));
    } catch (err) {
      console.error(`Error while getting task`, err.message);
      next(err);
    }
  }
async function create(req, res, next) {
  try {
    res.json(await tasks.create(req.body));
  } catch (err) {
    console.error(`Error while creating task`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await tasks.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating task`, err.message);
    next(err);
  }
}


module.exports = {
  getMultiple,
  create,
  update,
  getSingle
};
