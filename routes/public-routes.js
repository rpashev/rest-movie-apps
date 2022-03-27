import express from "express";

import catchAsync from "../middleware/catchAsync.js";
import publicController from "../controllers/public-controller.js";
import attachUserId from "../middleware/attachUserId.js";

const router = express.Router();

router.get(
  "/movies/:movieId",
  attachUserId,
  catchAsync(publicController.getMovie)
);
router.get(
  "/public-library",
  attachUserId,
  catchAsync(publicController.getPublicList)
);

// module.exports = router;
export default router;
