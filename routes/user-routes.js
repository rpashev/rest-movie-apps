import express from "express";

import catchAsync from "../middleware/catchAsync.js";
import listController from "../controllers/user-controller/list-controller.js";
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

//user update
router.post("/user-profile", catchAsync(authController.update));

// module.exports = router;
export default router;
