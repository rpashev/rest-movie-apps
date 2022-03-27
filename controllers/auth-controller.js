import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  // const { username, email, password, repeatPassword } = req.body;
  const username = req.body.username.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const repeatPassword = req.body.repeatPassword.trim();

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

  hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  // creating jwt token
  let token;

  token = await jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET
    // { expiresIn: "10h" }
  );

  res.status(201).json({
    token,
    username: user.username,
    userId: user.id,
    email: user.email,
    watchlist: user.watchlist.map((movie) => movie.IMDBId),
    seenlist: user.seenlist.map((movie) => movie.IMDBId),
    image: user.image,
  });
};
const login = async (req, res, next) => {
  // const { email, password } = req.body;
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  let regex = /\S+@\S+\.\S+/;
  if (regex.test(email) === false || email === "") {
    const error = new HttpError("Invalid email!", 400);
    return next(error);
  }

  let existingUser;

  existingUser = await User.findOne({ email: email })
    .populate("watchlist", "IMDBId")
    .populate("seenlist", "IMDBId");

  if (!existingUser) {
    const error = new HttpError("Invalid credentials, could not log in!", 401);
    return next(error);
  }

  let validPassword = false;

  validPassword = await bcrypt.compare(password, existingUser.password);

  if (!validPassword) {
    const error = new HttpError("Invalid password!", 401);
    return next(error);
  }

  let token; //maybe export creating the token

  token = await jwt.sign(
    {
      userId: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
    },
    process.env.JWT_SECRET
    // { expiresIn: "10h" }
  );

  res.status(201).json({
    token,
    username: existingUser.username,
    userId: existingUser.id,
    email: existingUser.email,
    watchlist: existingUser.watchlist.map((movie) => movie.IMDBId),
    seenlist: existingUser.seenlist.map((movie) => movie.IMDBId),
    image: existingUser.image,
  });
};

const update = async (req, res, next) => {
  const userId = req.userData.userId;
  const image = req.body.image;

  let existingUser;

  existingUser = await User.findById(userId);

  if (!existingUser) {
    const error = new HttpError("Invalid credentials, please log in!", 401);
    return next(error);
  }

  existingUser.image = image;

  await existingUser.save();

  res.json({ image: existingUser.image });
};

export default { register, login, update };
