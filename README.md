# RDP Automation Control Panel

## Overview

This project is an automation control panel for managing multiple RDP (Remote Desktop Protocol) clients. It enables you to send commands from a central control panel to multiple connected RDP instances and execute commands remotely.

## Features

- **Real-time Web UI Control Panel**: Send commands to multiple RDP clients simultaneously.
- **Connected RDP List**: Displays all active RDP connections along with their IP addresses.
- **Live Command Execution Logs**: View logs for executed commands in real time.
- **WebSocket Communication**: Uses `socket.io` for seamless real-time interaction.

## Installation

### 1. Clone the Repository

```sh
git clone https://github.com/ashishkprasad/RDP-Automation-Panel.git
cd RDP-Automation-Panel
```

### 2. Install Dependencies

For the Control Panel (Server):

```sh
cd RDP-Automation-Panel
npm install
```

For the RDP Agent (Client - on each RDP machine):

```sh
cd RDP-Automation-Panel
npm install socket.io-client
```

## Usage

### Start the Control Panel (on the Main RDP Server)

```sh
node server.js
```

This will start a web server at `http://YOUR_RDP_IP:3000`, where you can access the Control Panel.

### Start the RDP Agent (on each RDP Client)

1. Update `rdp-agent.js` with the actual IP of your control panel in:

   ```js
   const SERVER_URL = "http://YOUR-RDP-CONTROL-PANEL-IP:3000";
   ```

2. Run the RDP Agent on each RDP machine:

   ```sh
   node rdp-agent.js
   ```

Each connected RDP instance will appear in the sidebar of the web UI.

## Files & Structure

```
RDP-Automation-Panel/
│── public/             # Frontend UI files
│   ├── index.html      # Main control panel UI
│   ├── style.css       # Styling for UI
│── server.js           # Main server handling WebSockets & HTTP API
│── rdp-agent.js        # RDP agent script to run on each RDP machine
│── package.json        # Node.js dependencies
```

## License

This project is licensed under the MIT License.

---

Developed by **Ashish K Prasad**.
