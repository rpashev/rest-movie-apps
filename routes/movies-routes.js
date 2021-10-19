const express = require("express");

const moviesControllers = require("../controllers/movies-controller");
const router = express.Router();

router.get("/", (req, res, next) => res.send("Here")); //testing
router.get("/:movieId", moviesControllers.getMovieById);

module.exports = router;
