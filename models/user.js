const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLenght: 6 },
    image: { type: String, default: "" },
    watchlist: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }],
    seenlist: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
