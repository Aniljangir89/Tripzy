const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();

// Database connection
const connectTOdb = require('./db/db');
connectTOdb();

// CORS configuration
io = new Server(server, {
  cors: {
    origin:
     
      'https://uber-clone-sepia-nine.vercel.app',
    
    methods: ['GET', 'POST'],
    credentials: true
  }
});


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
