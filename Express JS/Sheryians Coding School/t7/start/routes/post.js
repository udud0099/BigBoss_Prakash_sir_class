const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/nayaproject");

const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
    trim: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  createdAt: [
    {
      type: Date,
      default: Date.now,
    },
  ],
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Post", postSchema);
