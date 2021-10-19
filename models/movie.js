const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    poster: { type: String, required: false },
    title: { type: String, required: true },
    IMDBrating: { type: Number, required: false }, //needs max length
    IMDBId: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
