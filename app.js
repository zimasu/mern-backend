const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./database');  // Import the connectDB function
const User = require('./models/User');  // Import the User model

const app = express();
const PORT = 5000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route (just to check if server is working)
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// CRUD routes

// 1. Create a new user (POST request)
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password,
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).send('Error saving user: ' + err));
});

// Backend route for handling user creation
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;  // Get the user data from the request
    const newUser = new User({ name, email, password });  // Create a new user instance
    await newUser.save();  // Save the user to the database
    res.status(201).json(newUser);  // Respond with the saved user
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user' });  // Handle errors
  }
});

// 2. Get all users (GET request)
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).send('Error fetching users: ' + err));
});

// 3. Get a user by ID (GET request)
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => res.json(user))
    .catch(err => res.status(400).send('Error fetching user: ' + err));
});

// 4. Update a user (PUT request)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  User.findByIdAndUpdate(id, { name, email, password }, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(400).send('Error updating user: ' + err));
});

// 5. Delete a user (DELETE request)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => res.send('User deleted'))
    .catch(err => res.status(400).send('Error deleting user: ' + err));
});

// DELETE route to delete all users
app.delete('/users', (req, res) => {
    // Use Mongoose's deleteMany() method to delete all users
    User.deleteMany({})
      .then(() => res.status(200).json({ message: 'All users deleted successfully!' }))
      .catch(err => res.status(500).json({ message: 'Error deleting users', error: err }));
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
