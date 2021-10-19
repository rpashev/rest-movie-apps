const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true, min: 0, max: 10 },
    title: { type: String, required: false, maxLength: 50 },
    content: { type: String, required: true }, //needs max length
    date: { type: Date, default: new Date() },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
