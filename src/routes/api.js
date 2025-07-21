// Import Basic
const express = require('express');
const ProfileController = require('../controller/ProfileController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const router = express.Router();

router.post('/CreateProfile', ProfileController.CreateProfile);
router.post('/UserLogin', ProfileController.UserLogin);
router.get('/UserProfile', AuthVerifyMiddleware, ProfileController.SelectProfile);
router.post('/UpdateProfile', AuthVerifyMiddleware, ProfileController.UpdateProfile);

module.exports = router;