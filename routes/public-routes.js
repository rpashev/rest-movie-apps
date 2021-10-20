const express = require("express");

const { publicControllers } = require("../controllers/public-controller");
const router = express.Router();

router.get("/movies/:movieId", publicControllers.getMovie); //testing

module.exports = router;
