/**
  {
    "api": 1,
    "name": "File Extension Info",
    "description": "Get information about file extensions",
    "author": "Boop",
    "icon": "doc.text.image",
    "tags": "file,extension,info,type"
  }
**/

function main(state) {
  try {
    let input = state.text.trim().toLowerCase();

    // Remove leading dot if present
    if (input.startsWith('.')) {
      input = input.substring(1);
    }

    // Extract extension from filename
    if (input.includes('/') || input.includes('\\')) {
      const parts = input.split(/[/\\]/);
      input = parts[parts.length - 1];
    }

    if (input.includes('.')) {
      const parts = input.split('.');
      input = parts[parts.length - 1];
    }

    const extensions = {
      // Programming
      'js': { name: 'JavaScript', type: 'Script', category: 'Programming', editor: 'Code editor' },
      'ts': { name: 'TypeScript', type: 'Script', category: 'Programming', editor: 'Code editor' },
      'py': { name: 'Python', type: 'Script', category: 'Programming', editor: 'Code editor' },
      'java': { name: 'Java', type: 'Source Code', category: 'Programming', editor: 'IDE' },
      'cpp': { name: 'C++', type: 'Source Code', category: 'Programming', editor: 'Code editor' },
      'c': { name: 'C', type: 'Source Code', category: 'Programming', editor: 'Code editor' },
      'rs': { name: 'Rust', type: 'Source Code', category: 'Programming', editor: 'Code editor' },
      'go': { name: 'Go', type: 'Source Code', category: 'Programming', editor: 'Code editor' },
      'rb': { name: 'Ruby', type: 'Script', category: 'Programming', editor: 'Code editor' },
      'php': { name: 'PHP', type: 'Script', category: 'Programming', editor: 'Code editor' },

      // Web
      'html': { name: 'HTML', type: 'Web Page', category: 'Web', editor: 'Code editor/Browser' },
      'css': { name: 'CSS', type: 'Stylesheet', category: 'Web', editor: 'Code editor' },
      'json': { name: 'JSON', type: 'Data', category: 'Data', editor: 'Text editor' },
      'xml': { name: 'XML', type: 'Markup', category: 'Data', editor: 'Text editor' },

      // Documents
      'pdf': { name: 'PDF', type: 'Document', category: 'Document', editor: 'PDF reader' },
      'doc': { name: 'Word Document', type: 'Document', category: 'Document', editor: 'MS Word' },
      'docx': { name: 'Word Document', type: 'Document', category: 'Document', editor: 'MS Word' },
      'txt': { name: 'Text', type: 'Document', category: 'Document', editor: 'Text editor' },
      'md': { name: 'Markdown', type: 'Document', category: 'Document', editor: 'Markdown editor' },

      // Images
      'jpg': { name: 'JPEG Image', type: 'Image', category: 'Media', editor: 'Image viewer' },
      'png': { name: 'PNG Image', type: 'Image', category: 'Media', editor: 'Image viewer' },
      'gif': { name: 'GIF Image', type: 'Image', category: 'Media', editor: 'Image viewer' },
      'svg': { name: 'SVG Vector', type: 'Vector', category: 'Media', editor: 'Vector editor' },

      // Archives
      'zip': { name: 'ZIP Archive', type: 'Archive', category: 'Archive', editor: 'Archive tool' },
      'tar': { name: 'TAR Archive', type: 'Archive', category: 'Archive', editor: 'Archive tool' },
      'gz': { name: 'GZIP', type: 'Compressed', category: 'Archive', editor: 'Archive tool' }
    };

    const info = extensions[input];

    let result = `=== FILE EXTENSION INFO ===\n\n`;
    result += `Extension: .${input}\n\n`;

    if (info) {
      result += `=== DETAILS ===\n`;
      result += `Name: ${info.name}\n`;
      result += `Type: ${info.type}\n`;
      result += `Category: ${info.category}\n`;
      result += `Open with: ${info.editor}\n\n`;

      result += `=== COMMON USAGE ===\n`;

      if (info.category === 'Programming') {
        result += `- Source code files\n`;
        result += `- Requires compiler/interpreter\n`;
        result += `- Version control recommended\n`;
      } else if (info.category === 'Web') {
        result += `- Web development\n`;
        result += `- Can be viewed in browser\n`;
        result += `- Text-based format\n`;
      } else if (info.category === 'Document') {
        result += `- Documentation\n`;
        result += `- Human-readable\n`;
        result += `- Shareable format\n`;
      } else if (info.category === 'Media') {
        result += `- Multimedia content\n`;
        result += `- Binary format\n`;
        result += `- Requires viewer\n`;
      } else if (info.category === 'Archive') {
        result += `- Compressed files\n`;
        result += `- Requires extraction\n`;
        result += `- Saves storage space\n`;
      }
    } else {
      result += `No information available for .${input}\n\n`;
      result += `Common extensions:\n`;
      result += `.js, .py, .java, .html, .css\n`;
      result += `.pdf, .doc, .txt, .md\n`;
      result += `.jpg, .png, .gif, .svg\n`;
      result += `.zip, .tar, .gz\n`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Extension lookup failed: " + error.message);
  }
}
