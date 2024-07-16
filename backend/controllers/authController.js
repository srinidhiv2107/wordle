const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user;
    user = await User.findOne({email});
    if(user) return res.json({ message: "email-exists" });

    user = await User.findOne({username});
    if(user) return res.json({ message: "username-exists" });

    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  }
  catch(error) {
    console.error("Signup error: ", error.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});
    if(!user) return res.json({ message: "invalid-user" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.json({ message: "invalid-password" });

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (error, token) => {
      if(error) throw error;
      res.json({ token });
    });
  }
  catch(error) {
    console.error("Login error: ", error.message);
    res.status(500).send("Server error");
  }
};

exports.middleware = function (req, res, next) {
  const token = req.header("token");

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if(error) return res.json({error: "invalid-token"});
    req.user = decoded.user;
    next();
  });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  }
  catch(error) {
    console.error("Error finding user: ", error.message);
    res.status(500).send("Server error");
  }
};

exports.updateStats = async (req, res) => {
  try {
    const { win, guessNumber } = req.body;
    const update = win ? {
      $inc: {
        "statistics.gamesPlayed": 1,
        "statistics.wins": 1,
        [`statistics.guessDistribution.${guessNumber}`]: 1
      }
    } : {
      $inc: { "statistics.gamesPlayed": 1 }
    };
    await User.updateOne({ _id: req.user.id }, update);
  }
  catch(error) {
    console.error("Error updating stats", error.message);
    res.status(500).send("Server error");
  }
};
