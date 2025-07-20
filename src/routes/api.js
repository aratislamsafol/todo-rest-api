// Import Basic
const express = require('express');
const ProfileController = require('../controller/ProfileController');
const router = express.Router();

router.post('/CreateProfile', ProfileController.CreateProfile);
router.post('/UserLogin', ProfileController.UserLogin);

module.exports = router;