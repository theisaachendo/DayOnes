import io from 'socket.io-client';
import { BASEURL } from '../constants'; // Import the base URL for the socket

// Initialize the socket connection with reconnection options
const socket = io(BASEURL, {
  transports: ['websocket'], // Specify websocket transport
  jsonp: false,
  reconnection: true,        // Enable automatic reconnection
  reconnectionAttempts: 10,  // Try to reconnect 10 times
  reconnectionDelay: 5000,   // Wait 5 seconds before trying to reconnect
});

// Event listener for connection
socket.on('connect', () => {
  console.log('Socket connected to:', BASEURL);
});

// Event listener for disconnection
socket.on('disconnect', (reason) => {
  console.log('Socket disconnected. Reason:', reason);
});

// Event listener for reconnection attempts
socket.on('reconnect_attempt', (attemptNumber) => {
  console.log('Reconnection attempt:', attemptNumber);
});

// Event listener for reconnection success
socket.on('reconnect', (attemptNumber) => {
  console.log('Reconnected to WebSocket after', attemptNumber, 'attempt(s)');
});

// Event listener for reconnection failure
socket.on('reconnect_failed', () => {
  console.error('Failed to reconnect to WebSocket');
});

// Event listener for errors
socket.on('error', (error) => {
  console.error('WebSocket Error:', error);
});

export default socket;
