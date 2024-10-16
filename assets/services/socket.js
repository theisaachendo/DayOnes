import io from 'socket.io-client';
import { BASEURL } from '../constants'; // Import the base URL for the socket

// Initialize the socket connection
const socket = io(BASEURL, {
  transports: ['websocket'], // Specify websocket transport
  jsonp: false,
});

// Event listener for connection
socket.on('connect', () => {
  console.log('Socket connected to:', BASEURL);
});

// Event listener for disconnection
socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

export default socket;
