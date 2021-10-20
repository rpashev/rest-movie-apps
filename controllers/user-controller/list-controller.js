const axios = require("axios");
const HttpError = require("../../models/http-error");
const Movie = require("../../models/movie");
const { queryPublicList } = require("./helpers");

const addToWatchlist = async (req, res, next) => {
  let result;
  let movie;
  try {
    result = await queryPublicList(req.body);
    if (result.code) {
      return next(result);
    } else {
      movie = result;
    }
  } catch (err) {
    const error = new HttpError("Could not add movie to watchlist!", 500);
    return next(error);
  }
  res.status(201).json({ movie });
};
const getWatchlist = async (req, res, next) => {};
const removeFromWatchlist = async (req, res, next) => {};
const addToSeenList = async (req, res, next) => {};
const getSeenlist = async (req, res, next) => {};
const removeFromSeenList = async (req, res, next) => {};

exports.listControllers = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  addToSeenList,
  getSeenlist,
  removeFromSeenList,
};
