const axios = require("axios");
const HttpError = require("../../models/http-error");
const Movie = require("../../models/movie");
const User = require("../../models/user");

const apiKey = "6b7999b9";

const queryPublicList = async (data) => {
  const { IMDBId } = data;
  let title, poster, IMDBRating;

  let isValidId;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${IMDBId}`
    );
    isValidId = response.data.Response;

    if (isValidId == "False") {
      const error = new HttpError(
        "Can't find a movie for the provided ID!",
        404
      );
      return error;
    }
    title = response.data.Title;
    poster = response.data.Poster;
    IMDBRating = response.data.imdbRating;
  } catch (err) {
    const error = new HttpError("Could not add movie, please try again!", 500);
    return error;
  }

  let existingMovie;
  try {
    existingMovie = await Movie.findOne({ IMDBId: IMDBId });
  } catch (err) {
    const error = new HttpError(
      "Could not add/get movie, something went wrong!",
      500
    );
    return error;
  }
  if (existingMovie) {
    return existingMovie.id;
  }

  if (!title) {
    const error = new HttpError("Title is missing, could not add movie!", 500);
    return error;
  }
  if (!IMDBId) {
    const error = new HttpError("Missing IMDB Id, could not add movie!", 500);
    return error;
  }

  const createdMovie = new Movie({
    title,
    poster,
    IMDBId,
    IMDBRating: +IMDBRating,
  });
  try {
    await createdMovie.save();
  } catch (err) {
    const error = new HttpError(
      "Could not create movie, internal server error!",
      500
    );
    return error;
  }
  return createdMovie.id;
};

const checkIfInUserList = async (userId, movieId, userList) => {
  let user;
  try {
    user = await User.findById(userId).populate(userList);
  } catch (err) {
    const error = new HttpError("Something went wrong, invalid user id", 500);
    return next(error);
  }
  if (!user) {
    return next(new HttpError("No such user", 401));
  }

  const movie = user[userList].find((mov) => mov.IMDBId === movieId);
  if (movie) {
    return true;
  } else {
    return false;
  }
};

exports.queryPublicList = queryPublicList;
exports.checkIfInUserList = checkIfInUserList;
