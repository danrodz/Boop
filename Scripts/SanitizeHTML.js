/**
  {
    "api": 1,
    "name": "Sanitize HTML",
    "description": "Remove potentially dangerous HTML tags and attributes",
    "author": "Boop",
    "icon": "shield",
    "tags": "html,sanitize,security,xss"
  }
**/

function main(state) {
  let html = state.text;

  // Remove script tags
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove iframe tags
  html = html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // Remove on* event attributes (onclick, onerror, etc.)
  html = html.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  html = html.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: protocol
  html = html.replace(/javascript:/gi, '');

  // Remove data: URIs in src attributes (potential XSS)
  html = html.replace(/src\s*=\s*["']data:[^"']*["']/gi, 'src=""');

  // Remove style attributes (can contain expression())
  html = html.replace(/\s*style\s*=\s*["'][^"']*["']/gi, '');

  // Remove object, embed tags
  html = html.replace(/<(object|embed)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '');

  state.text = html;
  state.postInfo("Sanitized HTML (basic XSS prevention)");
}
