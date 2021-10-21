const express = require("express");

const { listControllers } = require("../controllers/user-controller/list-controller");
const { reviewControllers } = require("../controllers/user-controller/review-controller");

const router = express.Router();

//user lists

router.post("/user/watchlist", (req, res, next) => listControllers.addToUserList(req, res, next, "watchlist"));
router.get("/user/watchlist", (req, res, next) => listControllers.getUserList(req, res, next, "watchlist"));
router.delete("/user/watchlist/:movieId", (req, res, next) => listControllers.removeFromUserlist(req, res, next, "watchlist")); 

router.post("/user/seenlist", (req, res, next) => listControllers.addToUserList(req, res, next, "seenlist"));
router.get("/user/seenlist", (req, res, next) => listControllers.getUserList(req, res, next, "seenlist"));
router.delete("/user/seenlist/:movieId", (req, res, next) => listControllers.removeFromUserlist(req, res, next, "seenlist"));

//reviews
router.post("/movies/:movieId/review", reviewControllers.addReview);
router.get("/user/reviews", reviewControllers.getAllUserReviews);

module.exports = router;
