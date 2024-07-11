const express = require('express');
const router = express.Router();
const Movie = require('../models/movies.model');

router.post('/create', async (req, res) => {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(200).json({code:200, movie});
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error creating movie', code:400 });
    }
  });

router.get('/get', async (req, res) => {
  try {
    const movies = await Movie.find().exec();
    res.json({code:200, movies});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching movies', code:500 });
  }
});

router.get('/get/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const movie = await Movie.findById(id).exec();
      if (!movie) {
        res.status(404).json({ message: 'Movie not found', code:404 });
      } else {
        res.json({code:200, movie});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching movie', code:500 });
    }
  });

  router.put('/update/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true }).exec();
      if (!movie) {
        res.status(404).json({ message: 'Movie not found', code:404 });
      } else {
        res.json({code:200, movie});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating movie', code:500 });
    }
  });

module.exports = router;