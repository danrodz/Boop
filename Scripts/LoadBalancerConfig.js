/**
  {
    "api": 1,
    "name": "Load Balancer Config Generator",
    "description": "Generate load balancer configuration (nginx upstream)",
    "author": "Boop",
    "icon": "arrow.triangle.branch",
    "tags": "loadbalancer,nginx,upstream,config"
  }
**/

function main(state) {
  try {
    const servers = state.text.split('\n').filter(s => s.trim());

    if (servers.length === 0) {
      state.postError("Enter server addresses (one per line)\nExample:\n192.168.1.10:8080\n192.168.1.11:8080");
      return;
    }

    let config = '# Nginx Load Balancer Configuration\n\n';
    config += 'upstream backend {\n';

    // Add load balancing method comment
    config += '  # Load balancing method: round-robin (default)\n';
    config += '  # Other options: least_conn, ip_hash, hash\n\n';

    // Add servers
    servers.forEach(server => {
      const trimmed = server.trim();
      if (trimmed) {
        config += `  server ${trimmed};\n`;
      }
    });

    config += '}\n\n';
    config += 'server {\n';
    config += '  listen 80;\n';
    config += '  server_name loadbalancer.local;\n\n';
    config += '  location / {\n';
    config += '    proxy_pass http://backend;\n';
    config += '    proxy_set_header Host $host;\n';
    config += '    proxy_set_header X-Real-IP $remote_addr;\n';
    config += '    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n';
    config += '    proxy_set_header X-Forwarded-Proto $scheme;\n';
    config += '  }\n';
    config += '}\n\n';
    config += '# Health check (nginx Plus only):\n';
    config += '# health_check interval=5s fails=3 passes=2;\n';

    state.text = config;
  } catch (error) {
    state.postError("Failed to generate config: " + error.message);
  }
}
