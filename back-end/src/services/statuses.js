const status = require('../models/statuses');
async function getMultiple() {
  try {
    return await status.find({}).sort({ weight: 1 });
  } catch (error) {
    throw new Error(error);
  }
}
async function getSingle(id) {
  try {
    return await status.findById(id);
  } catch (error) {
    throw new Error(error);
  }
}
async function create(body) {
  try {
    if (!body.weight) {
      const maxWeightStatus = await status.findOne().sort({ weight: -1 });
      body.weight = (maxWeightStatus ? maxWeightStatus.weight : 0) + 1;
    }
    return status.create(body);
  } catch (error) {
    throw new Error(error);
  }
}
async function update(id, updates) {
  try {
    const updatedStatus = await status.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return updatedStatus;
  } catch (error) {
    throw new Error(error);
  }
}

async function createMainStatuses() {
  try {
    const statuses = await status.find({
      title: { $in: ['TODO', 'DOING', 'DONE'] },
    });
    const maxWeightStatus = await status.findOne().sort({ weight: -1 });
    let weight = (maxWeightStatus ? maxWeightStatus.weight : 0) + 1;
    if (statuses.length === 0) {
      const toDo = new status({ title: 'TODO', weight, color: '#45c0e3' });
      weight++;
      const inProgress = new status({
        title: 'DOING',
        weight,
        color: '#816eee',
      });
      weight++;
      const done = new status({ title: 'DONE', weight, color: '#816eee' });
      await toDo.save();
      await inProgress.save();
      await done.save();
    }
  } catch (error) {}
}

async function updateManyStatuses(idWeightPairs) {
  try {
    const promises = idWeightPairs.map(async (pair) => {
      const { id, weight } = pair;
      return await status.findByIdAndUpdate(id, { weight }, { new: true });
    });
    return await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
  createMainStatuses,
  updateManyStatuses,
};
