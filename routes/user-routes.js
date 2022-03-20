import express from "express";
import listController from "../controllers/user-controller/list-controller.js";
import reviewController from "../controllers/user-controller/review-controller.js";
import authController from "../controllers/auth-controller.js";

const router = express.Router();

//user lists

router.post("/user/watchlist", (req, res, next) =>
  listController.addToUserList(req, res, next, "watchlist")
);
router.get("/user/watchlist", (req, res, next) =>
  listController.getUserList(req, res, next, "watchlist")
);
router.delete("/user/watchlist/:movieId", (req, res, next) =>
  listController.removeFromUserlist(req, res, next, "watchlist")
);

router.post("/user/seenlist", (req, res, next) =>
  listController.addToUserList(req, res, next, "seenlist")
);
router.get("/user/seenlist", (req, res, next) =>
  listController.getUserList(req, res, next, "seenlist")
);
router.delete("/user/seenlist/:movieId", (req, res, next) =>
  listController.removeFromUserlist(req, res, next, "seenlist")
);

//reviews
router.post("/movies/:movieId/review", reviewController.addReview);
router.delete(
  "/movies/:movieId/review/:reviewId",
  reviewController.deleteReview
);
router.get("/user/reviews", reviewController.getAllUserReviews);

//user update
router.post("/user-profile", authController.update);

// module.exports = router;
export default router;
