import React, { createContext, useEffect, useState } from 'react';
import { socket } from '../src/socket.js'; // Import the global socket instance

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [isSocketReady, setIsSocketReady] = useState(false);

  useEffect(() => {
    if (socket) {
      setIsSocketReady(true);
    }
  }, []);

  if (!isSocketReady) {
    return null; // Render nothing until the socket is ready
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
