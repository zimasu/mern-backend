const User = require('../models/User');

// Create a new user
exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    newUser.save()
        .then(() => res.status(201).json({ message: 'User created!' }))
        .catch(err => res.status(500).json({ error: 'Error creating user', details: err }));
};

// Get all users
exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: 'Error fetching users', details: err }));
};

// Get a specific user by email
exports.getUserByEmail = (req, res) => {
    User.findOne({ email: req.params.email })
        .then(user => {
            if (user) res.json(user);
            else res.status(404).json({ message: 'User not found' });
        })
        .catch(err => res.status(500).json({ error: 'Error fetching user', details: err }));
};

// Update a user by email
exports.updateUser = (req, res) => {
    const { name, password } = req.body;
    User.findOneAndUpdate({ email: req.params.email }, { name, password }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json({ error: 'Error updating user', details: err }));
};

// Delete a user by email
exports.deleteUser = (req, res) => {
    User.findOneAndDelete({ email: req.params.email })
        .then(() => res.json({ message: 'User deleted!' }))
        .catch(err => res.status(500).json({ error: 'Error deleting user', details: err }));
};
