const axios = require("axios");
const HttpError = require("../models/http-error");
const Movie = require("../models/movie");

const { checkIfInUserList } = require("./user-controller/helpers");
const apiKey = "6b7999b9";

const getMovie = async (req, res, next) => {
  let movie;
  // to check if in user lists/user left a review
  const userId = req.userData.userId;
  console.log(userId)

  const movieId = req.params.movieId;

  if (userId) {
    console.log(await checkIfInUserList(userId, movieId, "seenlist"));
  }

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

exports.publicControllers = {
  getMovie,
  getPublicList,
};
