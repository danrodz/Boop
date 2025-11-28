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
  try {
    let html = state.text;

    // Remove <script> tags and their contents
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove <iframe> tags and their contents
    html = html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

    // Remove <object> and <embed> tags and their contents
    html = html.replace(/<(object|embed)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '');

    // Remove on* event handler attributes (onclick, onerror, etc.)
    html = html.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
    html = html.replace(/\son\w+\s*=\s*[^\s>]+/gi, '');

    // Remove style attributes
    html = html.replace(/\sstyle\s*=\s*["'][^"']*["']/gi, '');

    // Strip javascript: protocol
    html = html.replace(/javascript:/gi, '');

    // Remove data: URIs in src attributes
    html = html.replace(/src\s*=\s*["']data:[^"']*["']/gi, 'src=""');
    html = html.replace(/src\s*=\s*data:[^\s>]*/gi, 'src=""');

    state.text = html;
    if (typeof state.postInfo === 'function') {
      state.postInfo("Sanitized HTML (basic XSS prevention)");
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Failed to sanitize HTML: " + error.message);
    }
  }
}
