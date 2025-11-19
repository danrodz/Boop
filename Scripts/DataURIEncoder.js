/**
  {
    "api": 1,
    "name": "Data URI Encoder",
    "description": "Converts text to base64 data URI",
    "author": "Boop",
    "icon": "link.circle.fill",
    "tags": "data,uri,base64,encode,embed"
  }
**/

function main(state) {
  try {
    const text = state.text;

    // Detect content type
    let mimeType = 'text/plain';

    if (text.trim().startsWith('<')) {
      if (text.includes('<svg')) mimeType = 'image/svg+xml';
      else if (text.includes('<html') || text.includes('<!DOCTYPE')) mimeType = 'text/html';
      else mimeType = 'text/xml';
    } else if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
      try {
        JSON.parse(text);
        mimeType = 'application/json';
      } catch (e) {
        // Not JSON, keep text/plain
      }
    } else if (text.includes('function') || text.includes('const') || text.includes('let')) {
      mimeType = 'application/javascript';
    }

    const base64 = btoa(unescape(encodeURIComponent(text)));
    const dataURI = `data:${mimeType};base64,${base64}`;

    const size = dataURI.length;
    const sizeKB = (size / 1024).toFixed(2);

    state.text = dataURI;
    state.postInfo(`Data URI created (${mimeType}, ${sizeKB} KB)`);

  } catch (error) {
    state.postError("Failed to encode: " + error.message);
  }
}
