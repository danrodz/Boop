/**
  {
    "api": 1,
    "name": "Systemd Service Generator",
    "description": "Generate systemd service file (input: name, exec, user)",
    "author": "Boop",
    "icon": "gearshape.2.fill",
    "tags": "systemd,service,linux,daemon,server"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const serviceName = lines[0] || 'myapp';
    const execStart = lines[1] || '/usr/bin/node /app/index.js';
    const user = lines[2] || 'www-data';
    const workingDir = lines[3] || '/app';

    const service = `[Unit]
Description=${serviceName} service
After=network.target

[Service]
Type=simple
User=${user}
WorkingDirectory=${workingDir}
ExecStart=${execStart}
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=${serviceName}

# Environment variables
# Environment="NODE_ENV=production"
# Environment="PORT=3000"

# Or use env file
# EnvironmentFile=/etc/${serviceName}/.env

# Security settings
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target

# Installation:
# 1. Save to /etc/systemd/system/${serviceName}.service
# 2. sudo systemctl daemon-reload
# 3. sudo systemctl enable ${serviceName}
# 4. sudo systemctl start ${serviceName}
# 5. sudo systemctl status ${serviceName}`;

    state.text = service;
  } catch (error) {
    state.postError("Error generating systemd service: " + error.message);
  }
}
