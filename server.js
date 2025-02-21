const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Store connected RDP clients
let connectedClients = {};

// Function to broadcast the list of connected RDP clients to the UI
function broadcastClients() {
  const clientList = Object.keys(connectedClients).map(id => ({
    id,
    ip: connectedClients[id].ip,
  }));
  io.emit('update-clients', clientList);
}

// Serve UI files
app.use(express.static(path.join(__dirname, 'public')));

// Allow both GET and POST for sending commands
app.all('/send-command', (req, res) => {
  const command = req.query.command || req.body.command;
  if (!command) {
    return res.status(400).json({ error: "No command provided" });
  }

  console.log(`Sending command to all RDPs: ${command}`);

  // Send command to all connected RDPs
  Object.values(connectedClients).forEach(clientObj => {
    clientObj.socket.emit('execute-command', command);
  });

  res.json({ message: `Command "${command}" sent to all RDPs.` });
});

// Handle WebSocket connections from RDP agents
io.on('connection', (socket) => {
  // Get client's IP address from handshake
  const clientIp = socket.handshake.address;
  console.log(`New RDP connected: ${socket.id}, IP: ${clientIp}`);
  connectedClients[socket.id] = { socket, ip: clientIp };
  broadcastClients();

  socket.on('disconnect', () => {
    console.log(`RDP disconnected: ${socket.id}`);
    delete connectedClients[socket.id];
    broadcastClients();
  });

  socket.on('log', (logMessage) => {
    console.log(`RDP ${clientIp} Log: ${logMessage}`);
    io.emit('log', `RDP ${clientIp}: ${logMessage}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Control Panel running on port ${PORT}`);
});
