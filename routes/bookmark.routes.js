const express = require("express");
const {
  addToBookmark,
  removeBookmark,
  getBookmarks,
} = require("../controller/bookmark.controller");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/user/bookmarks").get(isAuthenticated, getBookmarks);

router
  .route("/user/bookmark/:postId")
  .post(isAuthenticated, addToBookmark)
  .delete(isAuthenticated, removeBookmark);

module.exports = router;
