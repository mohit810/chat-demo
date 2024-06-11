const {
  createMessageService,
  findMessageById,
  saveMessage,
} = require("@services/messageService");

class messageController {
  constructor() {}

  async sendMessage(req, res) {
    const { groupId, content } = req.body;
    const userId = req.user._id;

    let message = await createMessageService(groupId, userId, content);

    res.send(message);
  }

  async likeMessage(req, res) {
    const userId = req.user._id;
    const { messageId } = req.params;

    let message = await findMessageById(messageId);
    if (!message) return res.status(404).send("Message was not found.");

    if (!message.likedBy.includes(userId)) {
      message.likes += 1;
      message.likedBy.push(userId);
      message = await saveMessage(message);
    }

    res.send(message);
  }
}

module.exports = messageController;
