const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

app.use('/api/auth', require('./routes/authRoutes'));

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3001");
});
