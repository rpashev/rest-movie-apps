const express = require("express");

const { listControllers } = require("../controllers/user-controller/list-controller");
const router = express.Router();

router.post("/user/watchlist", listControllers.addToWatchlist);
router.get("/user/watchlist");
router.delete("/user/watchlist/movieId"); //helper function maybe

router.post("/user/watched");
router.get("/user/watched");
router.delete("/user/watched/:movieId");



module.exports = router;
