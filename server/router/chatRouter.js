const express = require("express");
const authController = require("./../controller/authController");
const chatController = require("./../controller/chatController");

const router = express.Router();

router
  .route("/createChat")
  .post(authController.protect, chatController.createChat);

// router
//   .route("/createGroupChat")
//   .post(authController.protect, chatController.createGroupChat);

router
  .route("/getAllChat")
  .get(authController.protect, chatController.getAllChat);
router
  .route("/getOneChat/:id")
  .get(authController.protect, chatController.getOneChat);

router
  .route("/deleteChat/:chatId")
  .patch(authController.protect, chatController.deleteChat);

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
