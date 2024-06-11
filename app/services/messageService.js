const Message = require("@models/Message");

async function createMessageService(groupId, userId, content) {
  let message = new Message({ groupId, userId, content });
  return await message.save();
}

async function findMessageById(messageId) {
  return await Message.findById(messageId);
}

async function saveMessage(message) {
  await message.save;
  return message;
}

module.exports = {
  createMessageService,
  findMessageById,
  saveMessage,
};
