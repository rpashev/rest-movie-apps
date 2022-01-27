import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLenght: 6 },
    image: { type: String, default: "https://res.cloudinary.com/rpashev/image/upload/v1643288807/anonymous-avatar_msf690.png" },
    watchlist: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }],
    seenlist: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
