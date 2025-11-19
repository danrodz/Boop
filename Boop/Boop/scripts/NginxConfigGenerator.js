/**
  {
    "api": 1,
    "name": "Nginx Config Generator",
    "description": "Generate nginx config (input: domain, port, type: proxy/static/ssl)",
    "author": "Boop",
    "icon": "server.rack",
    "tags": "nginx,config,proxy,web,server"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const domain = lines[0] || 'example.com';
    const port = lines[1] || '3000';
    const type = lines[2]?.toLowerCase() || 'proxy';

    const configs = {
      proxy: `server {
    listen 80;
    server_name ${domain};

    location / {
        proxy_pass http://localhost:${port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,

      static: `server {
    listen 80;
    server_name ${domain};

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}`,

      ssl: `server {
    listen 80;
    server_name ${domain};
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${domain};

    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:${port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
    };

    const config = configs[type];

    if (!config) {
      state.text = 'Available types: proxy, static, ssl';
      return;
    }

    state.text = config;
  } catch (error) {
    state.postError("Error generating nginx config: " + error.message);
  }
}
