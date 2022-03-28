import express from "express";

import catchAsync from "../middleware/catchAsync.js";
import {
  attachWatchlist,
  attachSeenlist,
} from "../middleware/attachListname.js";

import listController from "../controllers/user-controller/list-controller.js";
import authController from "../controllers/auth-controller.js";

const router = express.Router();

//user lists

router.post("/user/watchlist", attachWatchlist, listController.addToUserList);
router.get("/user/watchlist", attachWatchlist, listController.getUserList);
router.delete(
  "/user/watchlist/:movieId",
  attachWatchlist,
  listController.removeFromUserlist
);

router.post("/user/seenlist", attachSeenlist, listController.addToUserList);
router.get("/user/seenlist", attachSeenlist, listController.getUserList);
router.delete(
  "/user/seenlist/:movieId",
  attachSeenlist,
  listController.removeFromUserlist
);

//user update
router.post("/user-profile", catchAsync(authController.update));

// module.exports = router;
export default router;
