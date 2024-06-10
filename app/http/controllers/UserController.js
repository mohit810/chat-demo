const User = require("@models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

class userController {
  constructor() {}

  async createUser(req, res) {
    const { username, password, isAdmin } = req.body;

    let user = await User.findOne({ username });
    if (user) return res.status(400).send("User already exists on The App.");

    user = new User({ username, password, isAdmin });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send(user);
  }

  async loginUser(req, res) {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .send("Invalid username or password. Please try again.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .send("Invalid username or password.Please try again.");

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      config.get("JWT_SECRET")
    );
    res.send({ token });
  }

  async logoutUser(req, res) {
    // Since JWTs are stateless, we can simply clear the token on the client side
    res.send("User logged out successfully.");
  }

  async editUser(req, res) {
    const { userId, username, password } = req.body;

    let user = await User.findById(userId);
    if (!user) return res.status(404).send("User was not found.");

    if (username) user.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.send(user);
  }
}

module.exports = userController;
