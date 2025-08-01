# Tripzy Frontend

A modern React-based web application for the Tripzy ride-sharing platform, built with Vite, React Router, and real-time socket communication.

## 🚀 Features

- **Real-time Communication**: Socket.io integration for live ride tracking and updates
- **Interactive Maps**: Leaflet integration for location services and live tracking
- **Responsive Design**: Tailwind CSS for modern, mobile-first styling
- **Smooth Animations**: GSAP for enhanced user experience
- **Role-based Access**: Separate interfaces for users and captains
- **Live Tracking**: Real-time location tracking during rides

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16.x or higher)
- **npm** (version 8.x or higher)

## 🛠️ Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🚀 Getting Started

### Development Mode

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be generated in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint and check for code quality issues:

```bash
npm run lint
```

## 📁 Project Structure

```
frontend/
├── components/           # Reusable React components
│   ├── CaptainDetails.jsx
│   ├── RidePopUp.jsx
│   ├── ConfirmRidePopUp.jsx
│   ├── LocationSearchPanel.jsx
│   ├── VehiclePanel.jsx
│   ├── ConfirmedVehicle.jsx
│   ├── LookingForDriver.jsx
│   ├── WaitForDriver.jsx
│   └── LiveTracking.jsx
├── context/              # React Context providers
│   ├── SocketContext.jsx
│   ├── CaptainContext.jsx
│   └── UserContext.jsx
├── pages/                # Main application pages
│   ├── Home.jsx
│   ├── Start.jsx
│   ├── CaptainHome.jsx
│   ├── UserLogin.jsx
│   ├── UserSignup.jsx
│   ├── CaptainLogin.jsx
│   ├── CaptainSignup.jsx
│   ├── Riding.jsx
│   ├── CaptainRiding.jsx
│   ├── RideFare.jsx
│   ├── UserProtectWrapper.jsx
│   └── CaptainProtectWrapper.jsx
├── public/               # Static assets
├── src/                  # Source files
│   └── App.jsx          # Main application component
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── eslint.config.js     # ESLint configuration
└── vercel.json         # Vercel deployment configuration
```

## 🛠️ Technologies Used

### Core Technologies
- **React 19.0.0** - Frontend framework
- **Vite 6.2.0** - Build tool and development server
- **React Router DOM 7.4.0** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.0.15** - Utility-first CSS framework
- **RemixIcon 4.6.0** - Icon library
- **GSAP 3.12.7** - Animation library

### Maps & Location
- **Leaflet 1.9.3** - Interactive maps
- **React Leaflet 5.0.0** - React components for Leaflet

### Communication
- **Socket.io Client 4.8.1** - Real-time communication
- **Axios 1.8.4** - HTTP client for API requests

### Development Tools
- **ESLint 9.21.0** - Code linting
- **PostCSS 8.5.3** - CSS processing
- **Autoprefixer 10.4.21** - CSS vendor prefixing

## 🔧 Configuration

### Environment Setup

Create a `.env` file in the frontend root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### Tailwind CSS

The project uses Tailwind CSS v4. Configuration is handled in [`tailwind.config.js`](tailwind.config.js).

### ESLint Configuration

Code quality is maintained using ESLint with React-specific rules. See [`eslint.config.js`](eslint.config.js) for the complete configuration.

## 🚦 Available Routes

- `/` - Landing page
- `/UserLogin` - User authentication
- `/UserSignup` - User registration
- `/CaptainLogin` - Captain authentication
- `/CaptainSignup` - Captain registration
- `/home` - User dashboard (protected)
- `/captain-home` - Captain dashboard (protected)
- `/riding` - Active ride for users
- `/captain-riding` - Active ride for captains
- `/RideFare` - Ride fare information

## 🔒 Protected Routes

The application includes route protection:
- **UserProtectWrapper** - Protects user-specific routes
- **CaptainProtectWrapper** - Protects captain-specific routes

## 🌐 Deployment

The project is configured for deployment on Vercel. See [`vercel.json`](vercel.json) for deployment settings.

To deploy:
1. Connect your repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Set up environment variables in Vercel dashboard

## 🤝 Contributing

1. Follow the ESLint configuration
2. Use conventional commit messages
3. Ensure all components are properly typed
4. Test thoroughly before submitting PRs

## 📄 License

This project is part of the Tripzy ride-sharing platform.