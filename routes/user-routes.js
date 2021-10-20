const express = require("express");

const { listControllers } = require("../controllers/user-controller/list-controller");
const router = express.Router();
//movies
router.post("/public-library", listControllers.addMovieToPublic);

router.post("/user/watchlist");
router.get("/user/watchlist");
router.delete("/user/watchlist/movieId"); //helper function maybe

router.post("/user/watched");
router.get("/user/watched");
router.delete("/user/watched/:movieId");

//reviews


module.exports = router;
