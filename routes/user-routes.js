const express = require("express");

const { userControllers } = require("../controllers/user-controller");
const router = express.Router();

router.post("/public-library", userControllers.addMovieToPublic);

module.exports = router;
