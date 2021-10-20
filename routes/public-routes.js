const express = require("express");

const { publicControllers } = require("../controllers/public-controller");
const router = express.Router();

router.get("/:movieId", publicControllers.getMovie); //testing

module.exports = router;
