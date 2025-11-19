/**
  {
    "api": 1,
    "name": "XML Formatter",
    "description": "Formats XML with proper indentation",
    "author": "Boop",
    "icon": "doc.text.fill",
    "tags": "xml,format,pretty,indent"
  }
**/

function main(state) {
  try {
    let xml = state.text.trim();

    // Remove existing whitespace between tags
    xml = xml.replace(/>\s+</g, '><');

    let formatted = '';
    let indent = 0;
    const tab = '  ';

    // Split by tags
    const parts = xml.split(/(<[^>]+>)/g).filter(p => p.trim());

    for (const part of parts) {
      if (!part.trim()) continue;

      if (part.startsWith('</')) {
        // Closing tag
        indent--;
        formatted += tab.repeat(Math.max(0, indent)) + part + '\n';
      } else if (part.startsWith('<') && part.endsWith('/>')) {
        // Self-closing tag
        formatted += tab.repeat(indent) + part + '\n';
      } else if (part.startsWith('<')) {
        // Opening tag
        formatted += tab.repeat(indent) + part + '\n';

        // Check if it's not a declaration or comment
        if (!part.startsWith('<?') && !part.startsWith('<!--')) {
          indent++;
        }
      } else {
        // Text content
        formatted += tab.repeat(indent) + part.trim() + '\n';
      }
    }

    state.text = formatted.trim();

  } catch (error) {
    state.postError("Failed to format XML: " + error.message);
  }
}
