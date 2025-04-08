const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();

// Database connection
const connectTOdb = require('./db/db');
connectTOdb();

// CORS configuration
const corsOptions = {
  origin: 'https://uber-clone-orvl-be6qaaxvv-aniljangir89s-projects.vercel.app', // Allow requests only from your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow credentials (cookies, Authorization header)
};

app.use(cors(corsOptions));  // Use the configured CORS options

// Middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('hi anil');
});

// Routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


module.exports = app;
