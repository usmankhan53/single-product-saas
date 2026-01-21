const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userroutes/userRoutes');
require('dotenv').config();


// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
// User Routes
app.use('/api/users', userRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
