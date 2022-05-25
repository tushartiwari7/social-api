const express = require("express");
const {
  addPost,
  getPosts,
  getPost,
  updateViewCount,
  deletePost,
  getUserFeed,
  getPostsByUser,
  updatePost,
} = require("../controller/post.controller");

const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router
  .route("/tweets")
  .post(isAuthenticated, addPost)
  .get(isAuthenticated, getPosts);

router.route("/tweets/feed").get(isAuthenticated, getUserFeed);
router.route("/tweets/userTweets/:userId").get(isAuthenticated, getPostsByUser);

router
  .route("/tweets/:tweetId")
  .get(isAuthenticated, getPost)
  .put(isAuthenticated, updatePost)
  .patch(isAuthenticated, updateViewCount)
  .delete(isAuthenticated, deletePost);

module.exports = router;
