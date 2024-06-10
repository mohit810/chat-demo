const Group = require("@models/Group");
const User = require("@models/User");

class GroupController {
  constructor() {}

  async createGroup(req, res) {
    const { name } = req.body;

    let group = new Group({ name });
    await group.save();

    res.send(group);
  }

  async addMember(req, res) {
    const { groupId, userId } = req.body;

    let group = await Group.findById(groupId);
    if (!group) return res.status(404).send("Group not found.");

    let user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found.");

    group.members.push(user);
    await group.save();

    res.send(group);
  }

  async deleteGroup(req, res) {
    const { groupId } = req.params;

    let group = await Group.findByIdAndDelete(groupId);
    if (!group) return res.status(404).send("Group not found.");

    res.send("Group deleted successfully.");
  }

  async searchGroups(req, res) {
    const { name } = req.query;

    let groups = await Group.find({ name: new RegExp(name, "i") });
    res.send(groups);
  }
}

module.exports = GroupController;
