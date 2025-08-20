// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

// import mongoose from "mongoose";
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/nayaproject");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    dp: {
      type: String, // URL to profile picture
      default: "",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // assumes you’ll have a Post model
      },
    ],
  },
  { timestamps: true }
);

module.exports =  mongoose.model("User", userSchema);
