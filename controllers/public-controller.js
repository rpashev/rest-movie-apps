import axios from "axios";
import HttpError from "../models/http-error.js";
import Movie from "../models/movie.js";
import Review from "../models/review.js";

import helpers from "./user-controller/helpers.js";
const apiKey = "6b7999b9";

const getMovie = async (req, res, next) => {
  let movie;

  const userId = req.userData.userId;
  const movieId = req.params.movieId;

  const response = await axios.get(
    `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`
  );
  movie = response.data;

  if (movie.Response == "False") {
    const error = new HttpError("Can't find a movie for the provided ID!", 404);
    return next(error);
  }

  //return reviews with movie
  let reviews;

  reviews = await Review.find({ IMDBId: movieId }).populate(
    "creator",
    "username"
  );

  movie.reviews = reviews;
  // console.log(userId)
  if (userId !== null) {
    const [isInWatchlist, isInSeenList] = await Promise.all([
      helpers.checkIfInUserList(userId, movieId, "watchlist"),
      helpers.checkIfInUserList(userId, movieId, "seenlist"),
    ]);

    movie.isInWatchlist = isInWatchlist;
    movie.isInSeenList = isInSeenList;
    // console.log("here")
  }

  res.json({ movie });
};
const getPublicList = async (req, res, next) => {
  let publicList;

  publicList = await Movie.find({});

  res.json(publicList);
};

export default { getMovie, getPublicList };
