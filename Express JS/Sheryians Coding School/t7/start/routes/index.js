var express = require("express");
var router = express.Router();

const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async function (req, res, next) {
  let createduser = await userModel.create({
    username: "harsh",
    password: "harsh",
    posts: [],
    email: "harsh@gmail.com",
    fullName: "Harsh Vandana Sharma",
  });
  res.send(createduser);
});

router.get("/createpost", async function (req, res, next) {
  let createdpost = await postModel.create({
    postText: "2 post heloo every one",
    user: "68a5b749454240d767e303ab",
  });
  let user = await userModel.findOne({ _id: "68a5b749454240d767e303ab" });
  user.posts.push(createdpost._id);
  await user.save();
  res.send(createdpost);
});

router.get("/alluserpost", async function (req, res, next) {
  let user = await userModel
    .findOne({ _id: "68a5b749454240d767e303ab" })
    .populate("posts");
  res.send(user);
});

module.exports = router;
