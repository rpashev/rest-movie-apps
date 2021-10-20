const express = require("express");

const { publicControllers } = require("../controllers/public-controller");
const attachUserId = require("../middleware/attachUserId");
const router = express.Router();

router.get("/movies/:movieId", attachUserId, publicControllers.getMovie); //testing
router.get("/public-library", publicControllers.getPublicList);

module.exports = router;
