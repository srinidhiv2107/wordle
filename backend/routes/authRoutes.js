const express = require('express');
const { signup, login, middleware, getUser, updateStats } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', middleware, getUser);
router.post('/user', middleware, updateStats);

module.exports = router;
