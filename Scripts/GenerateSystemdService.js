/**
  {
    "api": 1,
    "name": "Generate systemd Service",
    "description": "Generate a systemd service file template",
    "author": "Boop",
    "icon": "gear",
    "tags": "systemd,service,linux,devops,generate"
  }
**/

function main(state) {
  const serviceName = state.text.trim() || 'myapp';

  const service = `[Unit]
Description=${serviceName} service
After=network.target

[Service]
Type=simple
User=nobody
WorkingDirectory=/opt/${serviceName}
ExecStart=/usr/bin/${serviceName}
Restart=on-failure
RestartSec=10

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true

[Install]
WantedBy=multi-user.target`;

  state.text = service;
  state.postInfo("Generated systemd service file");
}
