var mongoose = require("mongoose");

var albumsSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      // required: true,
      maxlength: 32,
      trim: true
    },
    id: {
      type: Number,
      maxlength: 50,
      trim: true
    },
    title: {
      type: String,
      maxlength: 50
    }
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("Albums", albumsSchema);