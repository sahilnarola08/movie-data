const mongoose = require("mongoose");
const db = require('../dbconnection/db');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
    }
  });

const User = db.model('users', userSchema);
module.exports = User;