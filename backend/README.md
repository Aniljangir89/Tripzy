# Tripzy Backend

A robust Node.js backend API for the Tripzy ride-sharing platform, featuring real-time communication, location services, and comprehensive ride management.

## 🚀 Features

- **Real-time Communication**: Socket.IO for live updates and notifications
- **RESTful APIs**: Complete CRUD operations for users, captains, and rides
- **Authentication & Authorization**: JWT-based secure authentication
- **Location Services**: Integration with mapping services for coordinates and routing
- **Ride Management**: Complete ride lifecycle from creation to completion
- **Database Integration**: MongoDB with Mongoose ODM
- **Security**: CORS configuration, input validation, and secure password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16.x or higher)
- **npm** (version 8.x or higher)
- **MongoDB** (local installation or MongoDB Atlas)

## 🛠️ Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tripzy
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:5173
   ```

## 🚀 Getting Started

### Development Mode

To start the development server with auto-reload:

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or your configured PORT).

### Production Mode

To start the production server:

```bash
npm start
```

## 📁 Project Structure

```
backend/
├── controllers/              # Request handlers and business logic
│   ├── captain.controllers.js    # Captain authentication & management
│   ├── maps.controller.js        # Location and mapping services
│   ├── ride.controllers.js       # Ride lifecycle management
│   └── user.controllers.js       # User authentication & management
├── db/                      # Database configuration
│   └── db.js                    # MongoDB connection setup
├── middleware/              # Custom middleware functions
│   └── auth.middleware.js       # JWT authentication middleware
├── models/                  # Database schemas and models
│   ├── blacklistToken.model.js # Token blacklist for logout
│   ├── captain.model.js         # Captain data structure
│   ├── ride.model.js           # Ride data structure
│   └── user.model.js           # User data structure
├── routes/                  # API route definitions
│   ├── captain.routes.js        # Captain-related endpoints
│   ├── maps.routes.js          # Location service endpoints
│   ├── ride.routes.js          # Ride management endpoints
│   └── user.routes.js          # User-related endpoints
├── services/                # Business logic and external integrations
│   ├── captain.service.js       # Captain business logic
│   ├── maps.service.js         # Location and mapping services
│   ├── ride.service.js         # Ride management logic
│   └── user.service.js         # User business logic
├── app.js                   # Express app configuration
├── server.js               # Server entry point
├── socket.js               # Socket.IO configuration and events
├── package.json            # Dependencies and scripts
└── nodemon.json           # Nodemon configuration
```

## 🛠️ Technologies Used

### Core Technologies
- **Express.js 4.21.2** - Web framework
- **Node.js** - Runtime environment
- **Socket.IO 4.8.1** - Real-time communication

### Database & ODM
- **MongoDB** - NoSQL database
- **Mongoose 8.12.1** - MongoDB object modeling

### Authentication & Security
- **JWT (jsonwebtoken 9.0.2)** - Token-based authentication
- **bcrypt 5.1.1** - Password hashing
- **express-validator 7.2.1** - Input validation
- **CORS 2.8.5** - Cross-origin resource sharing

### Utilities
- **dotenv 16.4.7** - Environment variable management
- **cookie-parser 1.4.7** - Cookie parsing middleware
- **axios 1.8.4** - HTTP client for external APIs

### Development Tools
- **nodemon 3.1.9** - Development auto-reload

## 🔌 API Endpoints

### User Routes (`/users`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /profile` - Get user profile (protected)
- `GET /logout` - User logout (protected)

### Captain Routes (`/captains`)
- `POST /register` - Captain registration
- `POST /login` - Captain authentication  
- `GET /profile` - Get captain profile (protected)
- `POST /logout` - Captain logout (protected)

### Ride Routes (`/rides`)
- `POST /create` - Create new ride request
- `GET /get-fare` - Calculate ride fare
- `POST /confirm` - Confirm ride by captain
- `GET /start-ride` - Start ride with OTP verification
- `POST /end-ride` - Complete ride

### Maps Routes (`/maps`)
- `GET /getCoordinates` - Get coordinates from address
- `GET /get-distance-time` - Calculate distance and time
- `GET /get-suggestions` - Get address suggestions

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **User/Captain Registration**: Creates account and returns JWT token
2. **Login**: Validates credentials and returns JWT token
3. **Protected Routes**: Require valid JWT token in Authorization header
4. **Token Format**: `Bearer <token>`

### Example Usage:
```javascript
// Login request
fetch('/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

// Protected route request
fetch('/users/profile', {
  headers: {
    'Authorization': 'Bearer your_jwt_token_here'
  }
});
```

## 📡 Socket.IO Events

### Connection Events
- `connect` - Client connected to server
- `disconnect` - Client disconnected from server
- `join` - User/Captain joins their respective room

### Ride Events
- `new-ride` - New ride request broadcast to nearby captains
- `update-location-captain` - Captain location updates
- `joinSuccess` - Successful room join confirmation
- `joinError` - Room join error notification

### Location Events
- `locationError` - Invalid location data error

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend root:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/tripzy

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# CORS Configuration  
CORS_ORIGIN=http://localhost:5173

# External APIs (if applicable)
MAPS_API_KEY=your_maps_api_key
```

### CORS Configuration

The server is configured with CORS in [`app.js`](app.js):

```javascript
const corsOptions = {
  origin: ["https://uber-clone-orvl-git-main-aniljangir89s-projects.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
```

### Socket.IO Configuration

Real-time communication is handled in [`socket.js`](socket.js) with features:
- User/Captain room management
- Location tracking
- Ride request broadcasting
- Connection status monitoring

## 🗃️ Database Models

### User Model
- Personal information (name, email)
- Authentication data (hashed password)
- Socket connection tracking

### Captain Model  
- Personal information
- Vehicle details (type, plate, capacity, color)
- Location tracking
- Socket connection tracking

### Ride Model
- User and captain references
- Pickup and destination addresses
- Vehicle type and fare
- Ride status and OTP
- Timestamps

### Blacklist Token Model
- Token blacklisting for secure logout
- Expiration handling

## 🛡️ Security Features

1. **Password Hashing**: bcrypt for secure password storage
2. **JWT Authentication**: Stateless authentication
3. **Input Validation**: express-validator for request validation
4. **CORS Protection**: Configured for specific origins
5. **Token Blacklisting**: Secure logout implementation

## 🚀 Deployment

### Environment Setup
1. Set production environment variables
2. Configure MongoDB connection string
3. Update CORS origins for production domains

### Process Management
For production deployment, consider using PM2:

```bash
npm install -g pm2
pm2 start server.js --name "tripzy-backend"
```

## 📊 Monitoring & Logging

The application includes comprehensive logging:
- Connection status logging
- Database operation logging  
- Error handling and logging
- Socket event logging with timestamps

## 🤝 Contributing

1. Follow the existing code structure
2. Use proper error handling
3. Include input validation for all endpoints
4. Add appropriate logging
5. Test thoroughly before submitting PRs

## 📄 License

This project is part of the Tripzy ride-sharing platform.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB service is running
   - Verify connection string in `.env`

2. **Socket Connection Issues**
   - Verify CORS configuration
   - Check client-server URL matching

3. **Authentication Errors**
   - Ensure JWT_SECRET is set
   - Check token format in requests

4. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on the port

For more specific issues, check the console logs as the application provides detailed error messages.