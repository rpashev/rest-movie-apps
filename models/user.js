import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLenght: [6, "Password must be at least 6 characters"],
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/rpashev/image/upload/v1643288807/anonymous-avatar_msf690.png",
    },
    watchlist: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }],
    seenlist: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
