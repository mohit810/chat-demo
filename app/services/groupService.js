const Group = require("@models/Group");

async function createGroupService(name) {
  let group = new Group({ name });
  await group.save();
  return group;
}

async function groupFindById(groupId) {
  return await Group.findById(groupId);
}

async function findGroupByIdAndDelete(groupId) {
  return await Group.findByIdAndDelete(groupId);
}

async function searchGroupByName(name) {
  return await Group.find({ name: new RegExp(name, "i") });
}

module.exports = {
  createGroupService,
  groupFindById,
  findGroupByIdAndDelete,
  searchGroupByName,
};
