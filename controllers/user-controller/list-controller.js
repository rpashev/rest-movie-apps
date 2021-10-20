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

  res.status(201).json({[userList]: user[userList]});
};
const getUserList = async (req, res, next) => {};
const removeFromUserlist = async (req, res, next) => {};


exports.listControllers = {
  addToUserList,
  getUserList,
  removeFromUserlist
  
};
