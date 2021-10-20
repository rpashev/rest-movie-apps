const express = require("express");

const { listControllers } = require("../controllers/user-controller/list-controller");
const router = express.Router();

//user lists

router.post("/user/watchlist", (req, res, next) => listControllers.addToUserList(req, res, next, "watchlist"));
router.get("/user/watchlist");
router.delete("/user/watchlist/movieId"); //helper function maybe

router.post("/user/seenlist", (req, res, next) => listControllers.addToUserList(req, res, next, "seenlist"));
router.get("/user/seenlist");
router.delete("/user/seenlist/:movieId");

//reviews

module.exports = router;
