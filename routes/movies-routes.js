const express = require("express");

const moviesControllers = require("../controllers/movies-controller");
const router = express.Router();

router.get("/:movieId", moviesControllers.getMovieById);

module.exports = router;