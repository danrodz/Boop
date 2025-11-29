/**
  {
    "api": 1,
    "name": "Caddyfile Generator",
    "description": "Generate Caddyfile configuration (input: domain, port)",
    "author": "Boop",
    "icon": "server.rack",
    "tags": "caddy,caddyfile,proxy,server,https"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const domain = lines[0] || 'example.com';
    const port = lines[1] || '3000';

    const caddyfile = `${domain} {
    # Automatic HTTPS
    reverse_proxy localhost:${port}

    # Logging
    log {
        output file /var/log/caddy/${domain}.log
    }

    # Gzip compression
    encode gzip

    # Security headers
    header {
        # Enable HSTS
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

        # Prevent MIME sniffing
        X-Content-Type-Options "nosniff"

        # Clickjacking protection
        X-Frame-Options "SAMEORIGIN"

        # XSS protection
        X-XSS-Protection "1; mode=block"

        # Referrer policy
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # Static file caching
    @static {
        path *.jpg *.jpeg *.png *.gif *.ico *.svg *.css *.js *.woff *.woff2 *.ttf
    }
    header @static Cache-Control "max-age=31536000, public, immutable"
}

# WWW redirect
www.${domain} {
    redir https://${domain}{uri} permanent
}`;

    state.text = caddyfile;
  } catch (error) {
    state.postError("Error generating Caddyfile: " + error.message);
  }
}
