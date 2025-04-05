import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_BASE_URL, {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 5000,
});
window.socket = socket; // 👈 Make it accessible in DevTools

socket.on('connect', () => {
  console.log('✅ Socket connected:', socket.id);
  socket.isReady = true; // Mark socket as ready
});

socket.on('disconnect', (reason) => {
  console.warn('❌ Socket disconnected:', reason);
});
