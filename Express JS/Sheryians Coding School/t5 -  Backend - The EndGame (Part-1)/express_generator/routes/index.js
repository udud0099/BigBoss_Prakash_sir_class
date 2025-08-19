var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/create", async function (req, res, next) {
  // res.render("index", { title: "Express" });
  const createduser = await userModel.create({
    username: "Shiddddd",
    name: "siddant",
    age: 99,
  });
  res.send(createduser);
});

router.get("/allusers", async function (req, res, next) {
  let allusers = await userModel.find();
  res.send(allusers);
});

router.get("/oneusers", async function (req, res, next) {
  let oneusers = await userModel.findOne({ name: "whoamiii0" });
  res.send(oneusers || "no user fonund");
});

router.get("/delete", async function (req, res, next) {
  const deletedUser = await userModel.findOneAndDelete({ name: "whoamiii" });
  res.send(deletedUser);
});

// sessions
router.get("/savesessions", function (req, res) {
  req.session.ban = true;
  res.send("save sessions");
});

router.get("/readsessions", function (req, res) {
  if (req.session.ban === true) {
    res.send("you banned");
  } else {
    res.send("not ban");
  }
});

router.get("/deletesessions", function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.send("ban remove");
  });
});

// cookies
router.get("/savecookies", function (req, res) {
  res.cookie("age", 99);
  res.send("save cokkies");
});
router.get("/readcookies", function (req, res) {
  console.log(req.cookies.age);

  res.send("read cokkies");
});

router.get("/deletecookies", function (req, res) {
  res.clearCookie("age");

  res.send("delete cokkies");
});

module.exports = router;
