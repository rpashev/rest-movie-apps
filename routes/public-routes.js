import express from "express";
import publicController from "../controllers/public-controller.js";
import attachUserId from "../middleware/attachUserId.js";

const router = express.Router();

router.get("/movies/:movieId", attachUserId, publicController.getMovie);
router.get("/public-library", attachUserId, publicController.getPublicList);

// module.exports = router;
export default router;
