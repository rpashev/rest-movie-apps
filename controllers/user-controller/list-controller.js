const HttpError = require("../../models/http-error");
const User = require("../../models/user");

const { queryPublicList } = require("./helpers");

const addToWatchlist = async (req, res, next) => {
  let result;
  let movieObjectId;
  let userId = req.userData.userId;
  let user;
  try {
    result = await queryPublicList(req.body);
    if (result.code) {
      return next(result);
    } else {
      movieObjectId = result;
    }
  } catch (err) {
    const error = new HttpError("Could not add movie to watchlist!", 500);
    return next(error);
  }

  try {
    user = await User.findById(userId, "-password");
    if (user.watchlist.includes(movieObjectId)) {
      const error = new HttpError("Movie is already in the watchlist!", 400);
      return next(error);
    }
    user.watchlist.push(movieObjectId);
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Could not add movie to watchlist, try again!",
      500
    );
    return next(error);
  }

  res.status(201).json({watchlist: user.watchlist});
};
const getWatchlist = async (req, res, next) => {};
const removeFromWatchlist = async (req, res, next) => {};
const addToSeenList = async (req, res, next) => {};
const getSeenlist = async (req, res, next) => {};
const removeFromSeenList = async (req, res, next) => {};

exports.listControllers = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  addToSeenList,
  getSeenlist,
  removeFromSeenList,
};
