const express = require("express");

const createError = require("http-errors");

const router = express.Router();

const DUMMY_DATA = [
  { id: "m1", title: "Batman" },
  { id: "m2", title: "The Lord Of The Rings" },
  { id: "m3", title: "The Matrix" },
];

router.get('/:movieId', (req, res, next) => {
    const movieId = req.params.movieId; 
  
    const movie = DUMMY_DATA.find(m => {
      return m.id === movieId;
    });
  
    if (!movie) {
      throw new createError(401, 'Could not find a movie for the provided id.');
    }
  
    res.json({ movie }); 
  });

module.exports = router;
