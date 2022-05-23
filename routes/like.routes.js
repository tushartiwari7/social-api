const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  addLike,
  removeLike,
  getLikedPostByUser,
} = require("../controller/like.controller");

router.route("/tweet/likes").get(isAuthenticated, getLikedPostByUser);

router
  .route("/tweet/like/:postId")
  .post(isAuthenticated, addLike)
  .delete(isAuthenticated, removeLike);

module.exports = router;
