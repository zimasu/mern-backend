const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define CRUD routes
router.post('/users', userController.createUser);      // Create a new user
router.get('/users', userController.getAllUsers);      // Get all users
router.get('/users/:email', userController.getUserByEmail); // Get user by email
router.put('/users/:email', userController.updateUser);    // Update user
router.delete('/users/:email', userController.deleteUser); // Delete user

module.exports = router;
