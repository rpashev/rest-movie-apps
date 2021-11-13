import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    poster: { type: String, required: false },
    title: { type: String, required: true },
    IMDBRating: { type: String, required: false }, //needs max length
    IMDBId: { type: String, required: true },
    genre: { type: String },
    year: { type: String },
    runtime: { type: String },
    actors: { type: String },
    plot: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Movie", movieSchema);
export default mongoose.model("Movie", movieSchema);
