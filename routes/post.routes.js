const express = require("express");
const {
  addPost,
  getPosts,
  getPost,
  updateViewCount,
  deletePost,
  getUserFeed,
} = require("../controller/post.controller");

const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router
  .route("/tweets")
  .post(isAuthenticated, addPost)
  .get(isAuthenticated, getPosts);

router.route("/tweets/feed").get(isAuthenticated, getUserFeed);
router
  .route("/tweets/:postId")
  .get(isAuthenticated, getPost)
  .patch(isAuthenticated, updateViewCount)
  .delete(isAuthenticated, deletePost);

module.exports = router;
