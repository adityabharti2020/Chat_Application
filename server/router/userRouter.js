const express = require("express");
const authController = require("./../controller/authController");
const router = express.Router();

router.route("/signUp").post(authController.signUp);
router.route("/signUpVerification").post(authController.signUpVerification);
router.route("/logIn").post(authController.logIn);
router.route("/logOut").get(authController.logOut);
router
  .route("/getAllUser")
  .get(authController.protect, authController.getAllUser);

router.route("/auth").get(authController.protect, authController.auth);

router
  .route("/viewContactProfile")
  .get(authController.protect, authController.viewContactProfile);
router
  .route("/addContact/:addFriendId")
  .post(authController.protect, authController.addContact);
router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updateMyPassword);
router
  .route("/updateMe")
  .patch(authController.protect, authController.updateMe);

module.exports = router;
