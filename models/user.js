const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLenght: 6 },
    image: { type: String, default: "" },
    watchlist: [{ type: String, default: [] }], //for now it looks better like that as OMDB API will be called directly from React.
    seenlist: [{ type: String, default: [] }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review", default: [] }],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
