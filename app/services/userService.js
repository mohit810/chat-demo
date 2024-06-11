const User = require("@models/User");

async function userFindById(userId) {
  return await User.findById(userId);
}

async function findUserName(username) {
  return await User.findOne({ username });
}

async function saveUser(newFlag, username, password, isAdmin, userId = "") {
  let user;
  user = newFlag
    ? new User({ username, password, isAdmin })
    : await userFindById(userId);

  return await user.save();
}

module.exports = {
  userFindById,
  findUserName,
  saveUser,
};
