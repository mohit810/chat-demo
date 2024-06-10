const Message = require("@models/Message");

class messageController {
  constructor() {}

  async sendMessage(req, res) {
    const { groupId, content } = req.body;
    const userId = req.user._id;

    let message = new Message({ groupId, userId, content });
    await message.save();

    res.send(message);
  }

  async likeMessage(req, res) {
    const userId = req.user._id;
    const { messageId } = req.params;

    let message = await Message.findById(messageId);
    if (!message) return res.status(404).send("Message was not found.");

    if (!message.likedBy.includes(userId)) {
      message.likes += 1;
      message.likedBy.push(userId);
      await message.save();
    }

    res.send(message);
  }
}

module.exports = messageController;
