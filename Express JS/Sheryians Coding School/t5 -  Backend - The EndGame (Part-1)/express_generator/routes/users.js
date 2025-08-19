// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/practicekaro");

const userschema = mongoose.Schema({
  username: String,
  name: String,
  age:Number
})
