const HttpError = require("../../models/http-error");
const User = require("../../models/user");
const Review = require("../../models/review");
const Movie = require("../../models/movie");

const { checkIfInUserList } = require("./helpers");
const { queryPublicList } = require("./helpers");

const addReview = async (req, res, next) => {
  const userId = req.userData.userId;
  const movieId = req.params.movieId;
  const { rating, title, content } = req.body;
  let user;

  // checking and getting the movie Object Id
  let movieObjectId;
  try {
    const result = await queryPublicList(movieId, false);
    if (result.code) {
      return next(result);
    }
    movieObjectId = result;
  } catch (err) {
    const error = new HttpError(
      "Could not add a review, movie Id is invalid!",
      500
    );
    return next(error);
  }

  if (!movieObjectId) {
    const error = new HttpError("Can't add a review, invalid movie ID");
    return next(error);
  }

  //getting user with reviews and checking if a review for this movie is already left by user
  try {
    user = await User.findById(userId).populate("reviews");
    if (!user) {
      const error = new HttpError("Could not identify user!", 401);
      return next(error);
    }

    let existingReviewIndex = user.reviews.findIndex(
      (review) => review.movieId.toString() === movieObjectId.toString()
    );
    if (existingReviewIndex >= 0) {
      const error = new HttpError(
        "User has already left a review for this movie!",
        400
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Could not add review, please try again!", 500);
    return next(error);
  }

  //check if movie is in seen list, if in watchlist - can't leave a review
  try {
    const isInSeenlist = await checkIfInUserList(userId, movieId, "seenlist");
    if (!isInSeenlist) {
      const error = new HttpError(
        "Can't add a review if movie is not in seen list!",
        400
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Could not add movie, something went wrong!",
      500
    );
    return next(error);
  }

  if (!rating || !content) {
    const error = new HttpError("Rating and content are requred!", 400);
    return next(error);
  }

  const createdReview = new Review({
    rating: +rating,
    title,
    content,
    creator: userId,
    movieId: movieObjectId,
    IMDBId: movieId
  });

  try {
    await createdReview.save();
    const movie = await Movie.findById(movieObjectId);
    movie.reviews.unshift(createdReview.id);
    user.reviews.unshift(createdReview.id);
    await Promise.all([movie.save(), user.save()]);
  } catch (err) {
    const error = new HttpError("Could not save review!", 500);
    return next(error);
  }

  res.json(createdReview);
};

const editReview = async (req, res, next) => {};

const deleteReview = async (req, res, next) => {};

const getAllUserReviews = async (req, res, next) => {};

exports.reviewControllers = {
  addReview,
  editReview,
  deleteReview,
  getAllUserReviews,
};
