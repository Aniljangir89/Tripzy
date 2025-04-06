import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import UserContext from '../context/UserContext.jsx';
import { CaptainContext } from '../context/CaptainContext.jsx';
import SocketProvider from '../context/SocketContext.jsx';




createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <CaptainContext>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </SocketProvider>
);
