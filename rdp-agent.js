const io = require('socket.io-client');
const { exec } = require('child_process');

// Replace this with your actual Control Panel IP
const SERVER_URL = "http://YOUR-CONTROL-PANEL-IP:3000";

// Connect to the Control Panel
const socket = io(SERVER_URL);

socket.on('connect', () => {
  console.log("Connected to Control Panel!");
});

socket.on('execute-command', (command) => {
  console.log(`Received command: ${command}`);
  
  // Execute the command on this RDP machine
  exec(command, (error, stdout, stderr) => {
    if (error) {
      socket.emit('log', `Error executing: ${error.message}`);
      return;
    }
    if (stderr) {
      socket.emit('log', `Command stderr: ${stderr}`);
      return;
    }
    socket.emit('log', `Command Output: ${stdout}`);
  });
});
