const express = require("express");

const router = express.Router();

const DUMMY_DATA = [
  { id: 1, title: "Batman" },
  { id: 2, title: "The Lord Of The Rings" },
  { id: 3, title: "The Matrix" },
];

router.get("/:movieId", (req, res, next) => {
  const id = req.params.movieId;
  const movie = DUMMY_DATA.find((m) => m.id === +id);
  res.json({ movie });
});

module.exports = router;
