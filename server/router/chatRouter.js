const express = require("express");
const authController = require("./../controller/authController");
const chatController = require("./../controller/chatController");

const router = express.Router();

router
  .route("/createChat")
  .post(authController.protect, chatController.createChat);

router
  .route("/createGroupChat")
  .post(authController.protect, chatController.createGroupChat);

router.route("/getChat").get(authController.protect, chatController.getChat);

router
  .route("/renameGroup")
  .patch(authController.protect, chatController.renameGroup);
router
  .route("/removeGroup")
  .delete(authController.protect, chatController.removeGroup);

router
  .route("/addToGroup")
  .patch(authController.protect, chatController.addToGroup);

module.exports = router;
