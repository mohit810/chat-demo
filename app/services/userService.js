const User = require("@models/User");

async function userFindById(userId) {
  return await User.findById(userId);
}

async function findUserName(username) {
  return await User.findOne({ username });
}

async function saveUser(newFlag, username, password, isAdmin, userId = "") {
  var user;
  user = newFlag
    ? new User({ username, password, isAdmin })
    : userFindById(userId);
  await user.save;
  return user;
}

module.exports = {
  userFindById,
  findUserName,
  saveUser,
};
