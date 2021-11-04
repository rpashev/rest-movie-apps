import mongoose from "mongoose";
import HttpError from "../../models/http-error.js";
import Movie from "../../models/movie.js";
import User from "../../models/user.js";
import Review from "../../models/review.js";

import helpers from "./helpers.js";

const addReview = async (req, res, next) => {
  const userId = req.userData.userId;
  const movieId = req.params.movieId; //IMDB ID
  // const { rating, title, content } = req.body;
  const rating = req.body.rating.trim();
  const title = req.body.title.trim();
  const content = req.body.content.trim();
  let user;

  // checking and getting the movie Object Id
  let movieObjectId;
  try {
    const result = await helpers.queryPublicList(movieId, false);
    if (result.code) {
      //checking if there is an error
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
      (review) => review.movie.toString() === movieObjectId.toString()
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
    const isInSeenlist = await helpers.checkIfInUserList(
      userId,
      movieId,
      "seenlist"
    );
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
  if (+rating < 1 || +rating > 10) {
    const error = new HttpError("Rating must be between 1 and 10!", 400);
    return next(error);
  }

  const createdReview = new Review({
    rating: +rating,
    title,
    content,
    creator: userId,
    movie: movieObjectId,
    IMDBId: movieId,
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

const editReview = async (req, res, next) => {}; //not sure if necessary

const deleteReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const userId = req.userData.userId;
  try {
  } catch (err) {
    console.log(err);
  }
  let user;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(reviewId)
  ) {
    const error = new HttpError(
      "Invalid credentials or review ID! Could not delete!",
      400
    );
    return next(error);
  }
  let review;

  try {
    review = await Review.findById(reviewId).populate("movie");
    if (!review) {
      const error = new HttpError("Could not find a review for this ID", 404);
      return next(error);
    }

    if (review.creator.toString() !== userId) {
      const error = new HttpError("Not authorzied to delete!", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Could not delete, try again!", 500);
    return next(error);
  }

  try {
    //with transactions maybe?
    user = await User.findById(userId);
    user.reviews.pull(reviewId);
    review.movie.reviews.pull(reviewId);

    await Promise.all([review.remove(), review.movie.save(), user.save()]);
  } catch (err) {
    const error = new HttpError(
      "Could not delete review, something went wrong!",
      500
    );
    return next(error);
  }
  res.json("deleted");
};

const getAllUserReviews = async (req, res, next) => {
  const userId = req.userData.userId;
  let user;
  let reviews;
  try {
    user = await User.findById(userId).populate({
      path: "reviews",
      populate: { path: "movie" },
    });
    if (!user) {
      const error = new HttpError("Invalid user!", 401);
      return next(error);
    }
    reviews = user.reviews;
  } catch (err) {
    const error = new HttpError("Could not retrieve user reviews!", 500);
    return next(error);
  }
  res.json(reviews);
};

// exports.reviewControllers = {
//   addReview,
//   editReview,
//   deleteReview,
//   getAllUserReviews,
// };
export default {
  addReview,
  editReview,
  deleteReview,
  getAllUserReviews,
};
