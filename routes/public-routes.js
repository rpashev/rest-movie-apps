import express from "express";
import publicControllers from "../controllers/public-controller.js";
import attachUserId from "../middleware/attachUserId.js";

const router = express.Router();
router.get("/", (req, res) => res.send("HELLOOOO"));
router.get("/movies/:movieId", attachUserId, publicControllers.getMovie); //testing
router.get("/public-library", attachUserId, publicControllers.getPublicList);

// module.exports = router;
export default router;
