import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  const { username, email, password, repeatPassword } = req.body;

  if (!username) {
    const error = new HttpError("Username is required!", 400);
    return next(error);
  }
  if (repeatPassword !== password || password.length < 6) {
    const error = new HttpError(
      "Passwords must match and be at least 6 symbols!",
      400
    );
    return next(error);
  }
  //validate email
  let regex = /\S+@\S+\.\S+/;
  if (regex.test(email) === false || email === "") {
    const error = new HttpError("Invalid email!", 400);
    return next(error);
  }

  let existingUser;
  //check if email is used
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Could not sign up, please try again!", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User with such email already exists! Please login instead!",
      422
    );
    return next(error);
  }
  //check if username is taken
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("Could not sign up, please try again!", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "This username is taken, please choose another one!",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not register, please try again!", 500);
    return next(error);
  }
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Could not register, please try again later!",
      500
    );
    return next(error);
  }
  // creating jwt token
  let token;
  try {
    token = await jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      "I_like_peanut_butter_banana_protein_shakes",
      { expiresIn: "10h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again!");
    return next(error);
  }

  res.status(201).json({ userId: user.id, email: user.email, token });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let regex = /\S+@\S+\.\S+/;
  if (regex.test(email) === false || email === "") {
    const error = new HttpError("Invalid email!", 400);
    return next(error);
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("Invalid credentials, could not log in!", 401);
    return next(error);
  }

  let validPassword = false;
  try {
    validPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log in, please check credentials and try again!"
    );
    return next(error);
  }

  if (!validPassword) {
    const error = new HttpError("Invalid password!", 401);
    return next(error);
  }

  let token; //maybe export creating the token
  try {
    token = await jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
      },
      "I_like_peanut_butter_banana_protein_shakes",
      { expiresIn: "10h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again!");
    return next(error);
  }

  res
    .status(201)
    .json({ userId: existingUser.id, email: existingUser.email, token });
};

// exports.authControllers = {
//   register,
//   login,
// };
export default { register, login };
