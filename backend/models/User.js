const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  statistics: {
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    guessDistribution: {
      type: [Number],
      default: [0, 0, 0, 0, 0, 0]
    }
  }
});

const User = mongoose.model("", userSchema, "users");

module.exports = User;
