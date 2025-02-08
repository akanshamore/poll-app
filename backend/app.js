const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);



module.exports = app;
