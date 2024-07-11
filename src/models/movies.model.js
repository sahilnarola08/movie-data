const mongoose = require("mongoose");
const db = require('../dbconnection/db');

const movieSchema = new mongoose.Schema({
    Title: {
      type: String,
    },
    Runtime: {
      type: Number,
    },
    Year: {
      type: String,
    },
    Description: {
      type: String,
    },
    Poster: {
      type: String,
    },
    isFavorite: {
        type: Boolean,
        default: false
      },
      Comments: [{
        username: String,
        commentmssg: String
      }],
  });

const Movie = db.model('movie', movieSchema);
module.exports = Movie;