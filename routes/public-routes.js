const express = require("express");

const { publicControllers } = require("../controllers/public-controller");
const router = express.Router();

router.get("/movies/:movieId", publicControllers.getMovie); //testing
router.get("/public-library", publicControllers.getPublicList);

module.exports = router;
