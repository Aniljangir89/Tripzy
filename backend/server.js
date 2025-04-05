const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket'); // Import initializeSocket
const port = process.env.PORT || 4000;

const server = http.createServer(app);

initializeSocket(server); // Initialize socket with the server

server.listen(port, () => {
  console.log('server is listening on port', port);
});
