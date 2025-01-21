const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.get("/", verifyToken, isAdmin, userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.post("/", verifyToken, isAdmin, userController.createUser);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
