// Import Basic
const express = require('express');
const ProfileController = require('../controller/ProfileController');
const router = express.Router();

router.post('/CreateProfile', ProfileController.CreateProfile);

module.exports = router;