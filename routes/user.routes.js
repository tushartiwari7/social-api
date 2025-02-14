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
  getUserFollowers,
  getUserFollowings,
  getUsers,
  searchUsers,
  getUser,
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
router.route("/user/follow/:followeeId").put(isAuthenticated, followUser);
router.route("/user/unfollow/:followeeId").patch(isAuthenticated, unFollowUser);
router.route("/user/followers").get(isAuthenticated, getFollowers);
router.route("/user/followings").get(isAuthenticated, getFollowings);
router.route("/users").get(isAuthenticated, getUsers);
router.route("/search_users").get(isAuthenticated, searchUsers);
router.route("/user/:userId").get(isAuthenticated, getUser);

// testing a new route
router.route("/user/followers/:userId").get(isAuthenticated, getUserFollowers);
router
  .route("/user/followings/:userId")
  .get(isAuthenticated, getUserFollowings);
module.exports = router;
