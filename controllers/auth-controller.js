const HttpError = require("../models/http-error");
const User = require("../models/user");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  const user = new User({
    username,
    email,
    password,
  });
  try {
    await user.save();
    res.send("Success");
  } catch (err) {
    const error = new HttpError(
      "Could not register, please try again later!",
      500
    );
    return next(error);
  }
};
const login = async (req, res, next) => {};

exports.authControllers = {
  register,
  login,
};
