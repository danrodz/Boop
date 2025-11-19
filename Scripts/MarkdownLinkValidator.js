/**
  {
    "api": 1,
    "name": "Markdown Link Validator",
    "description": "Validate and list all links in markdown",
    "author": "Boop",
    "icon": "link",
    "tags": "markdown,link,validate,check"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const links = [];
    const images = [];

    // Extract regular links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const isImage = text[match.index - 1] === '!';

      if (!isImage) {
        links.push({
          text: match[1],
          url: match[2],
          position: match.index
        });
      }
    }

    // Extract images ![alt](url)
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

    while ((match = imageRegex.exec(text)) !== null) {
      images.push({
        alt: match[1],
        url: match[2],
        position: match.index
      });
    }

    // Extract reference-style links
    const refRegex = /\[([^\]]+)\]:\s*(.+)$/gm;
    const references = [];

    while ((match = refRegex.exec(text)) !== null) {
      references.push({
        name: match[1],
        url: match[2]
      });
    }

    let result = '';

    if (links.length > 0) {
      result += `=== LINKS (${links.length}) ===\n\n`;
      links.forEach((link, i) => {
        result += `[${i + 1}] ${link.text}\n`;
        result += `    URL: ${link.url}\n`;

        // Basic validation
        if (link.url.startsWith('http://')) {
          result += `    ⚠️  Warning: Uses insecure HTTP\n`;
        }
        if (link.url.includes(' ')) {
          result += `    ❌ Error: URL contains spaces\n`;
        }
        if (link.url === '') {
          result += `    ❌ Error: Empty URL\n`;
        }

        result += '\n';
      });
    }

    if (images.length > 0) {
      result += `=== IMAGES (${images.length}) ===\n\n`;
      images.forEach((img, i) => {
        result += `[${i + 1}] Alt: "${img.alt}"\n`;
        result += `    URL: ${img.url}\n`;

        if (!img.alt) {
          result += `    ⚠️  Warning: Missing alt text\n`;
        }

        result += '\n';
      });
    }

    if (references.length > 0) {
      result += `=== REFERENCE LINKS (${references.length}) ===\n\n`;
      references.forEach((ref, i) => {
        result += `[${i + 1}] [${ref.name}]: ${ref.url}\n`;
      });
      result += '\n';
    }

    if (links.length === 0 && images.length === 0 && references.length === 0) {
      result = 'No links or images found';
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Link validation failed: " + error.message);
  }
}
