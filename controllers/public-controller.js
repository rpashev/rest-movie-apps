import axios from "axios";
import HttpError from "../models/http-error.js";
import Movie from "../models/movie.js";
import Review from "../models/review.js";

import helpers from "./user-controller/helpers.js";
const apiKey = "6b7999b9";

const getMovie = async (req, res, next) => {
  let movie;
  // to check if in user lists/user left a review
  const userId = req.userData.userId;
  console.log(userId);

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
  //return reviews with movie
  let reviews;
  try {
    reviews = await Review.find({ IMDBId: movieId }).populate(
      "creator",
      "username"
    );
  } catch (err) {
    const error = new HttpError(
      "Could not load movie, something went wrong!",
      500
    );
    return next(error);
  }
  movie.reviews = reviews;

  if (userId !== null) {
    try {
      const [isInWatchlist, isInSeenList] = await Promise.all([
        helpers.checkIfInUserList(userId, movieId, "watchlist"),
        helpers.checkIfInUserList(userId, movieId, "seenlist"),
      ]);

      movie.isInWatchlist = isInWatchlist;
      movie.isInSeenList = isInSeenList;
    } catch (err) {
      const error = new HttpError(
        "Could not load movie, something went horribly wrong!",
        500
      );
      return next(error);
    }
  }
  // reviews = await Review.find({})

  //check if logged in
  //check if movie is in lists

  res.json({ movie });
};
const getPublicList = async (req, res, next) => {
  let publicList;
  try {
    publicList = await Movie.find({});
  } catch (err) {
    const error = new HttpError("Could not get public list!", 500);
    return next(error);
  }
  res.json(publicList);
};

// exports.publicControllers = {
//   getMovie,
//   getPublicList,
// };
export default { getMovie, getPublicList };
