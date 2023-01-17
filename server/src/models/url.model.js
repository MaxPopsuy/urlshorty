const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    origUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      // required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("url", urlSchema);
