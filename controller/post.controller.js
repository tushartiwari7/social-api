const cloudinary = require("cloudinary");
const Post = require("../model/post.model");
const User = require("../model/user.model");
exports.addPost = async (req, res) => {
  const {
    description = "",
    tags = [],
    userPhoto = "",
    userName = "",
  } = req.body;
  if (!description)
    return res
      .status(400)
      .send({ success: false, message: "Please write something" });

  try {
    let imageResponse = {};
    let videoResponse = {};
    if (req.files?.image) {
      imageResponse = await cloudinary.v2.uploader.upload(
        req.files.image.tempFilePath,
        { folder: "post/image" }
      );
    }

    if (req.files?.video) {
      videoResponse = await cloudinary.v2.uploader.upload(
        req.files.video.tempFilePath,
        { folder: "post/video", resource_type: "video" }
      );
    }

    const image = {
      id: imageResponse.public_id,
      url: imageResponse.secure_url,
    };
    const videoURL = {
      id: videoResponse.public_id,
      url: videoResponse.secure_url,
    };

    const tweet = await Post.create({
      user: req.userId,
      description,
      image,
      tags,
      videoURL,
    });
    res.status(201).send({
      success: true,
      tweet: {
        ...tweet._doc,
        user: {
          _id: req.userId,
          name: userName,
          photo: {
            secure_url: userPhoto,
          },
        },
      },
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// get all videos  ---> /api/videos
exports.getPosts = async (req, res) => {
  try {
    // get all videos from db
    const tweets = await Post.find()
      .populate("user", "name photo")
      .sort({ createdAt: -1 });
    // if no videos found return 404
    if (!tweets && tweets.length === 0)
      return res
        .status(404)
        .send({ success: false, message: "No tweets found" });

    // return all videos
    res.status(200).send({ success: true, tweets });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getPost = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const tweet = await Post.findById(tweetId, {}, { lean: true }).populate(
      "user",
      "name photo"
    );

    if (!tweet)
      return res
        .status(200)
        .send({ success: true, tweet: [], message: "No Tweets found" });

    // return  a video
    res.status(200).send({ success: true, tweet });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const tweets = await Post.find(
      { user: userId },
      {},
      { lean: true }
    ).populate("user", "name photo");
    if (!tweets || tweets.length === 0)
      return res
        .status(200)
        .send({
          success: true,
          tweets: [],
          message: "No tweet found for this user",
        });

    // return  a video
    res.status(200).send({ success: true, tweets });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.updateViewCount = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const tweet = await Post.findByIdAndUpdate(
      { _id: tweetId },
      {
        $inc: {
          "statistics.viewCount": 1,
        },
      },
      {
        new: true,
      }
    );
    if (!tweet)
      return res
        .status(404)
        .send({ success: false, message: "No post found with this id" });
    // return  a video
    res.status(200).send({ success: true, tweet });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { tweetId } = req.params;
  try {
    const tweet = await Post.findByIdAndDelete({ _id: tweetId });
    if (!tweet)
      return res
        .status(404)
        .send({ success: false, message: "No posts found for this user id" });

    // return  a video
    res.status(200).send({ success: true, tweet });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getUserFeed = async (req, res) => {
  try {
    const { followings } = await User.findById(req.userId);
    const tweets = await Post.find({
      $or: [
        {
          user: {
            $in: followings,
          },
        },
        {
          user: req.userId,
        },
      ],
    })
      .populate("user", "name photo")
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, tweets });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
