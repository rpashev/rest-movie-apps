const HttpError = require("../../models/http-error");
const Movie = require("../../models/movie");

const queryPublicList = async (data) => {
  const { title, poster, IMDBRating, IMDBId } = data;
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
    return existingMovie;
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
  return createdMovie;
};

exports.queryPublicList = queryPublicList;
