import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating needs to be at least 1"],
      max: [10, "Rating needs to be max 10"],
    },
    title: {
      type: String,
      maxLength: [50, "Review title can be max 50 characters!"],
    },
    content: {
      type: String,
      required: [true, "Review body is required"],
      maxlength: [500, "Review body can't be more than 500 characters"],
    }, //needs max length
    date: { type: Date, default: new Date() },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator id is required"],
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, "Movie ID is required"],
    },
    IMDBId: { type: String, required: [true, "IMDB ID is required"] },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Review", reviewSchema);
export default mongoose.model("Review", reviewSchema);
