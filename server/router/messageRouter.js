const express = require("express");
const authController = require("./../controller/authController");
const messageController = require("./../controller/messageController");

const router = express.Router();

router
  .route("/sendMessage")
  .post(authController.protect, messageController.sendMessage);
router
  .route("/allMessages/:chatId")
  .get(authController.protect, messageController.allMessages);

// router
//   .route("/createGroupChat")
//   .post(authController.protect, chatController.createGroupChat);

// router.route("/getChat").get(authController.protect, chatController.getChat);

// router
//   .route("/renameGroup")
//   .patch(authController.protect, chatController.renameGroup);
// router
//   .route("/removeGroup")
//   .delete(authController.protect, chatController.removeGroup);

// router
//   .route("/addToGroup")
//   .patch(authController.protect, chatController.addToGroup);

module.exports = router;
