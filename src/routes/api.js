// Import Basic
const express = require('express');
const ProfileController = require('../controller/ProfileController');
const ToDoListController = require('../controller/ToDoListController');
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const router = express.Router();

router.post('/CreateProfile', ProfileController.CreateProfile);
router.post('/UserLogin', ProfileController.UserLogin);
router.get('/UserProfile', AuthVerifyMiddleware, ProfileController.SelectProfile);
router.post('/UpdateProfile', AuthVerifyMiddleware, ProfileController.UpdateProfile);
// ToDo Routes
router.post('/CreateToDo', AuthVerifyMiddleware, ToDoListController.CreateToDo); 
router.get('/SelectToDo', AuthVerifyMiddleware, ToDoListController.SelectToDo);
router.post('/UpdateToDo', AuthVerifyMiddleware, ToDoListController.UpdateToDo);
router.post('/UpdateStatusToDo', AuthVerifyMiddleware, ToDoListController.UpdateStatusToDo);
router.get('/RemoveToDo', AuthVerifyMiddleware, ToDoListController.RemoveToDo);
router.get('/SelectToDoByStatus', AuthVerifyMiddleware, ToDoListController.SelectToDoByStatus);
router.get('/SelectToDoByDate', AuthVerifyMiddleware, ToDoListController.SelectToDoByDate);

module.exports = router;