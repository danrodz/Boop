/**
  {
    "api": 1,
    "name": "Generate Security Headers",
    "description": "Generate common security HTTP headers",
    "author": "Boop",
    "icon": "lock",
    "tags": "security,headers,http,web"
  }
**/

function main(state) {
  const headers = `# Security Headers

# Prevent clickjacking
X-Frame-Options: DENY

# Enable XSS protection
X-XSS-Protection: 1; mode=block

# Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# Referrer policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions policy (formerly Feature Policy)
Permissions-Policy: geolocation=(), microphone=(), camera=()

# HSTS (HTTP Strict Transport Security)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Content Security Policy
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'

# Remove server information
Server: -
X-Powered-By: -

# CORS (if needed)
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400`;

  state.text = headers;
  state.postInfo("Generated security headers");
}
