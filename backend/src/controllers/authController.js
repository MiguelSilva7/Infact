const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { models } = require("../models/index");
const jwtConfig = require("../config/jwtConfig");

const authController = {
  register: async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
      const existingUser = await models.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = { username, email, password: hashedPassword, role };
      const newUser = await models.User.create(userData);

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "An error occurred during registration" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await models.User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        jwtConfig.secret,
        { expiresIn: "1h" },
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  },
};

module.exports = authController;
