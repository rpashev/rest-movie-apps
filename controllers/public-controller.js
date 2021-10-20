const axios = require("axios");
const HttpError = require("../models/http-error");

const apiKey = "6b7999b9";

const getMovie = async (req, res, next) => {
  let movie;

  const movieId = req.params.movieId;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
    );
    movie = response.data;

    if (movie.Response == "False") {
      const error = new HttpError(
        "Can't find a movie for the provided ID!",
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Could not load movie, please try again!", 500);
    return next(error);
  }

  res.json({ movie });
};

exports.publicControllers = {
  getMovie,
};
