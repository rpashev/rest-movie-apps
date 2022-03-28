import HttpError from "../../models/http-error.js";
import User from "../../models/user.js";

import helpers from "./helpers.js";

const addToUserList = async (req, res, next) => {
  const userList = req.list;
  let result;
  let movieObjectId;
  let userId = req.userData.userId;
  let user;

  if (!req.body.IMDBId) {
    const error = new HttpError("No movie ID is provided!", 400);
    return next(error);
  }
  try {
    result = await helpers.queryPublicList(req.body.IMDBId, true);
    if (result.code) {
      return next(result);
    } else {
      movieObjectId = result;
    }
  } catch (err) {
    const error = new HttpError(`Could not add movie to ${userList}!`, 500);
    return next(error);
  }

  try {
    user = await User.findById(userId, "-password");

    if (user[userList].includes(movieObjectId)) {
      const error = new HttpError(`Movie is already in the ${userList}!`, 400);
      return next(error);
    }
    user[userList].push(movieObjectId);

    await user.save();
  } catch (err) {
    const error = new HttpError(
      `Could not add movie to ${userList}, try again!`,
      500
    );
    return next(error);
  }

  res.status(201).json({ [userList]: user[userList] });
};

const getUserList = async (req, res, next) => {
  const userList = req.list;
  const userId = req.userData.userId;
  let list;

  try {
    const user = await User.findById(userId).populate(userList);
    if (!user) {
      const error = new HttpError(
        "Could not retrieve list, invalid user!",
        401
      );
      return next(error);
    }
    list = user[userList];
  } catch (err) {
    const error = new HttpError(
      `Could not retrieve ${userList}, please try again!`
    );
    return next(error);
  }
  res.json(list);
};

const removeFromUserlist = async (req, res, next) => {
  const userList = req.list;
  const userId = req.userData.userId;
  const movieId = req.params.movieId;

  try {
    const user = await User.findById(userId).populate([userList]);

    if (!user) {
      const error = new HttpError(
        `Could not remove from ${userList}, invalid user!`,
        401
      );
      return next(error);
    }

    const movieIndex = user[userList].findIndex(
      (movie) => movie.IMDBId === movieId
    );

    if (movieIndex < 0) {
      const error = new HttpError(
        `Could not remove from ${userList}, no movie in the list with such ID!`,
        400
      );
      return next(error);
    }

    user[userList].splice(movieIndex, 1);
    await user.save();
  } catch (err) {
    const error = new HttpError(
      `Could not remove from ${userList}, please try again!`,
      500
    );
    return next(error);
  }
  res.json("deleted");
};

export default {
  addToUserList,
  getUserList,
  removeFromUserlist,
};
