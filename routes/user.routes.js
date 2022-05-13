const express = require("express");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
  followUser,
  unFollowUser,
  getFollowers,
  getFollowings,
  getUsers,
} = require("../controller/user.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);
router.route("/forgot-password").get(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/user/profile").get(isAuthenticated, getUserDetails);
router.route("/user/update_password").post(isAuthenticated, updateUserPassword);
router
  .route("/user/update_user_details")
  .post(isAuthenticated, updateUserDetails);
router.route("/user/follow").put(isAuthenticated, followUser);
router.route("/user/un_follow").patch(isAuthenticated, unFollowUser);
<<<<<<< HEAD
=======
router.route("/user/followers").get(isAuthenticated, getFollowers);
router.route("/user/followings").get(isAuthenticated, getFollowings);
router.route("/users").get(isAuthenticated, getUsers);
>>>>>>> 68928376cbf49b9eba7d34656c5c74ffa8ee65e5

module.exports = router;
