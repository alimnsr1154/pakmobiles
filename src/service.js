const express = require('express');
const connectDB = require('./db'); // Import the function to connect to MongoDB
const mobilesRouter = require('./routes/mobiles'); // Import the router for mobiles
const cors = require('cors');

// Middleware
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests


// Routes
app.use('', mobilesRouter); // Mount the mobiles router

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
connectDB()
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
