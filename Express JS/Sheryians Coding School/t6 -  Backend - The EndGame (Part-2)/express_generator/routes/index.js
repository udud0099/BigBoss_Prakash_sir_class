var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// flash message
router.get("/failed", function (req, res, next) {
  req.flash("age", 99);
  res.send("bangaya");
});
router.get("/check", function (req, res, next) {
  console.log(req.flash("age"));
  res.send("ok");
});

// mongo db
router.get("/create", async function (req, res) {
  let userdata = await userModel.create({
    username: "whoami",
    nickname: "whoami is plyer",
    description:
      "hoo 6 -  Ba  ress_generathe quick brown fox jumps over lazy dog. ss JS heryians Coding Sctor>npx no",
    categories: ["typing", "code", "next", "lines"],
  });
  res.send(userdata);
});

router.get("/find_include_name", async function (req, res) {
  var regex = new RegExp("Harsh", "i");
  let user = await userModel.find({ username: regex });
  res.send(user);
});

router.get("/find_exjact", async function (req, res) {
  var regex = new RegExp("^Harsh$", "i");
  // ^ $ it help to find exjact name
  let user = await userModel.find({ username: regex });
  res.send(user);
});

router.get("/find_base_in_catogary", async function (req, res) {
  let user = await userModel.find({ categories: { $all: ["js"] } });
  res.send(user);
});

router.get("/find_by_date_range", async function (req, res) {
  let date1 = new Date("2025-8-18");
  let date2 = new Date("2025-8-20");

  let user = await userModel.find({
    datecreated: { $gte: date1, $lte: date2 },
  });
  res.send(user);
});

router.get("/find_base_in_field", async function (req, res) {
  let user = await userModel.find({ categories: { $exists: true } });
  res.send(user);
});

router.get("/find_base_in_field_length", async function (req, res) {
  let user = await userModel.find({
    $expr: {
      $and: [
        { $gte: [{ $strLenCP: "$nickname" }, 0] },
        { $lte: [{ $strLenCP: "$nickname" }, 50] },
      ],
    },
  });
  res.send(user);
});

module.exports = router;
