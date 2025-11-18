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

    // Remove script tags and content
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove event handlers
    html = html.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
    html = html.replace(/\son\w+\s*=\s*[^\s>]*/gi, '');

    // Remove iframe
    html = html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

    // Remove object/embed
    html = html.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
    html = html.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');

    // Remove javascript: in links
    html = html.replace(/javascript:/gi, '');

    // Remove data: URIs (can be used for XSS)
    html = html.replace(/data:text\/html/gi, '');

    state.text = html;
    state.postInfo("Removed: scripts, event handlers, iframes, embeds");
  } catch (error) {
    state.postError("Failed to sanitize HTML: " + error.message);
  }
}
