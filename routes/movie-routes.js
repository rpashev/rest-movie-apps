import express from "express";

import catchAsync from "../middleware/catchAsync.js";
import movieController from "../controllers/movie-controller.js";
import reviewController from "../controllers/user-controller/review-controller.js";
import attachUserId from "../middleware/attachUserId.js";

const router = express.Router();

router.get(
  "/movies/:movieId",
  attachUserId,
  catchAsync(movieController.getMovie)
);
router.get(
  "/public-library",
  attachUserId,
  catchAsync(movieController.getPublicList)
);

//reviews
router.post("/movies/:movieId/review", reviewController.addReview);

router.delete(
  "/movies/:movieId/review/:reviewId",
  reviewController.deleteReview
);

router.get("/user/reviews", reviewController.getAllUserReviews);

// module.exports = router;
export default router;
