const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const messageController = new (require("@controllers/messageController"))();
const auth = require("@middleware/auth");

// Message Routes
router.post(
  "/send",
  auth,
  asyncHandler(messageController.sendMessage.bind(this))
);
router.put(
  "/like/:messageId",
  auth,
  asyncHandler(messageController.likeMessage.bind(this))
);

module.exports = router;
