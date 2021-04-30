const express = require("express");

const authControllers = require("../controllers/auth-controller");
const router = express.Router();

router.get("/register", authControllers.Register)

module.exports = router;