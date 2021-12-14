import express from "express";
import listControllers from "../controllers/user-controller/list-controller.js";
import reviewControllers from "../controllers/user-controller/review-controller.js";
import authControllers from "../controllers/auth-controller.js";

const router = express.Router();

//user lists

router.post("/user/watchlist", (req, res, next) =>
  listControllers.addToUserList(req, res, next, "watchlist")
);
router.get("/user/watchlist", (req, res, next) =>
  listControllers.getUserList(req, res, next, "watchlist")
);
router.delete("/user/watchlist/:movieId", (req, res, next) =>
  listControllers.removeFromUserlist(req, res, next, "watchlist")
);

router.post("/user/seenlist", (req, res, next) =>
  listControllers.addToUserList(req, res, next, "seenlist")
);
router.get("/user/seenlist", (req, res, next) =>
  listControllers.getUserList(req, res, next, "seenlist")
);
router.delete("/user/seenlist/:movieId", (req, res, next) =>
  listControllers.removeFromUserlist(req, res, next, "seenlist")
);

//reviews
router.post("/movies/:movieId/review", reviewControllers.addReview);
router.delete(
  "/movies/:movieId/review/:reviewId",
  reviewControllers.deleteReview
);
router.get("/user/reviews", reviewControllers.getAllUserReviews);

//user update
router.post("/user-profile", authControllers.update);


// module.exports = router;
export default router;
