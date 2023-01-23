const tasks = require('../models/tasks');
async function getMultiple(body) {
  try {
    return await tasks.find(body).sort({ weight: 1 }).populate('status').exec();
  } catch (error) {
    throw new Error(error);
  }
}
async function getSingle(id) {
  try {
    return await tasks.findById(id);
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    if (!body.weight) {
      const maxWeighttasks = await tasks.findOne().sort({ weight: -1 });
      body.weight = (maxWeighttasks ? maxWeighttasks.weight : 0) + 1;
    }
    return (await tasks.create(body)).populate('status');
  } catch (error) {
    throw new Error(error);
  }
}
async function update(id, updates) {
  try {
    const updatedtasks = await tasks
      .findByIdAndUpdate(id, updates, {
        new: true,
      })
      .populate('status');
    return updatedtasks;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
};
