const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const groupController = new (require("@controllers/groupController"))();
const auth = require("@middleware/auth");

// Group Management Routes
router.post(
  "/create",
  auth,
  asyncHandler(groupController.createGroup.bind(this))
);
router.put(
  "/addMember",
  auth,
  asyncHandler(groupController.addMember.bind(this))
);
router.delete(
  "/:groupId",
  auth,
  asyncHandler(groupController.deleteGroup.bind(this))
);
router.get(
  "/search",
  auth,
  asyncHandler(groupController.searchGroups.bind(this))
);

module.exports = router;
