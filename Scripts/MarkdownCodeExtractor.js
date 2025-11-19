/**
  {
    "api": 1,
    "name": "Markdown Code Extractor",
    "description": "Extract code blocks from markdown",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "markdown,code,extract,blocks"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const blocks = [];

    // Extract fenced code blocks
    const fencedRegex = /```(\w+)?\n([\s\S]+?)```/g;
    let match;

    while ((match = fencedRegex.exec(text)) !== null) {
      blocks.push({
        type: 'fenced',
        language: match[1] || 'plaintext',
        code: match[2].trim()
      });
    }

    // Extract inline code
    const inlineRegex = /`([^`\n]+)`/g;
    const inline = [];

    while ((match = inlineRegex.exec(text)) !== null) {
      inline.push(match[1]);
    }

    if (blocks.length === 0 && inline.length === 0) {
      state.text = 'No code blocks found';
      return;
    }

    let result = '';

    if (blocks.length > 0) {
      result += `=== CODE BLOCKS (${blocks.length}) ===\n\n`;

      blocks.forEach((block, i) => {
        result += `[${i + 1}] Language: ${block.language}\n`;
        result += `${'='.repeat(50)}\n`;
        result += block.code + '\n';
        result += `${'='.repeat(50)}\n\n`;
      });
    }

    if (inline.length > 0) {
      result += `=== INLINE CODE (${inline.length}) ===\n\n`;
      inline.forEach((code, i) => {
        result += `[${i + 1}] ${code}\n`;
      });
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Extraction failed: " + error.message);
  }
}
