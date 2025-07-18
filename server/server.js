const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./db');

const apiRoutes = require('./apiRoutes');

const app = express();

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
