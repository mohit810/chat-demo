const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const userController = new (require("@controllers/userController"))();
const auth = require("@middleware/auth");

// Admin Routes
router.post("/create", asyncHandler(userController.createUser.bind(this)));
router.put("/edit", auth, asyncHandler(userController.editUser.bind(this)));

// Authentication Routes
router.post("/login", asyncHandler(userController.loginUser.bind(this)));
router.post(
  "/logout",
  auth,
  asyncHandler(userController.logoutUser.bind(this))
);

module.exports = router;
