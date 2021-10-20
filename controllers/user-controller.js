const axios = require("axios");
const HttpError = require("../models/http-error");
const Movie = require("../models/movie");

const addMovieToPublic = async (req, res, next) => {
  const { title, poster, IMDBRating, IMDBId } = req.body;
  if (!title) {
    const error = new HttpError("Title is missing, could not add movie!", 500);
    return next(error);
  }
  if (!IMDBId) {
    const error = new HttpError("Missing IMDB Id, could not add movie!", 500);
    return next(error);
  }
  let existingMovie;
  try {
    existingMovie = await Movie.findOne({ IMDBId: IMDBId });
  } catch (err) {
    const error = new HttpError(
      "Could not add movie, something went wrong!",
      500
    );
    return next(error);
  }
  if (existingMovie) {
    const error = new HttpError("Movie already exists in public library!", 400);
    return next(error);
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
    return next(error);
  }
  res.json({ createdMovie });
};

exports.userControllers = {
  addMovieToPublic,
};
