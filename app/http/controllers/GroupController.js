const {
  createGroupService,
  groupFindById,
  findGroupByIdAndDelete,
  searchGroupByName,
} = require("@services/groupService");
const { userFindById } = require("@services/userService");

class groupController {
  constructor() {}

  async createGroup(req, res) {
    const { name } = req.body;

    let group = await createGroupService(name);

    res.send(group);
  }

  async addMember(req, res) {
    const { groupId, userId } = req.body;

    let group = await groupFindById(groupId);
    if (!group) return res.status(404).send("Group not found.");

    let user = await userFindById(userId);
    if (!user) return res.status(404).send("User not found.");

    group.members.push(user);
    await group.save();

    res.send(group);
  }

  async deleteGroup(req, res) {
    const { groupId } = req.params;

    let group = await findGroupByIdAndDelete(groupId);
    if (!group) return res.status(404).send("Group not found.");

    res.send({ message: "Group deleted successfully." });
  }

  async searchGroups(req, res) {
    const { name } = req.query;

    let groups = await searchGroupByName(name);
    res.send(groups);
  }
}

module.exports = groupController;
