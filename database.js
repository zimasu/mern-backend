const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string
    const connection = await mongoose.connect('mongodb+srv://zimasupro:H1DghkvNc7f6P7YY@cluster0.cylab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
