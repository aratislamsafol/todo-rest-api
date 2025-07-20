// Basic Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

// Security Middleware Import
const hpp = require('hpp');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Database
const mongoose = require('mongoose');

// Security Middleware implement
app.use(cors());
app.use(helmet());
app.use(hpp());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, 
})
app.use(limiter)

// BodyParser Implement
app.use(bodyParser.json());

// connection mongoose
const dotenv = require('dotenv');
dotenv.config({ path: './config.js'});

let URI = process.env.MongoURL;
let OPTION = { user: '', pass: '' };

mongoose.connect(URI, OPTION)
  .then(() => {
    console.log("MongoDB connection success");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routing Implement
app.use('/api/v1', router)

// Undefined Route Implement
app.use((req, res) => {
  res.status(404).json({ status: "Failed", data: "Not Found" });
});

module.exports = app;
