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

module.exports = router;
