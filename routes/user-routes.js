import express from "express";

import catchAsync from "../middleware/catchAsync.js";
import attachListname from "../middleware/attachListname.js";

import listController from "../controllers/user-controller/list-controller.js";
import authController from "../controllers/auth-controller.js";

const router = express.Router();

//user lists

router.post("/user/watchlist", attachListname, listController.addToUserList);
router.get("/user/watchlist", attachListname, listController.getUserList);
router.delete(
  "/user/watchlist/:movieId",
  attachListname,
  listController.removeFromUserlist
);

router.post("/user/seenlist", attachListname, listController.addToUserList);
router.get("/user/seenlist", attachListname, listController.getUserList);
router.delete(
  "/user/seenlist/:movieId",
  attachListname,
  listController.removeFromUserlist
);

//user update
router.post("/user-profile", catchAsync(authController.update));

// module.exports = router;
export default router;
