const HttpError = require("../../models/http-error");
const User = require("../../models/user");

const { queryPublicList } = require("./helpers");

const addToUserList = async (req, res, next, userList) => {
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

const getUserList = async (req, res, next, userList) => {
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

const removeFromUserlist = async (req, res, next, userList) => {
  const userId = req.userData.userId;
  const movieId = req.params.movieId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new HttpError(
        `Could not remove from ${userList}, invalid user!`,
        401
      );
      return next(error);
    }

    const movieIndex = user[userList].findIndex(
      (id) => id.toString() === movieId
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

exports.listControllers = {
  addToUserList,
  getUserList,
  removeFromUserlist,
};
