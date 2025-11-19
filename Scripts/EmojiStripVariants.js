/**
  {
    "api": 1,
    "name": "Emoji Variant Stripper",
    "description": "Remove emoji variation selectors",
    "author": "Boop",
    "icon": "face.smiling",
    "tags": "emoji,variant,strip,selector"
  }
**/

function main(state) {
  try {
    let text = state.text;
    const original = text;

    // Remove variation selectors
    text = text.replace(/\uFE0E/g, '');  // Text presentation
    text = text.replace(/\uFE0F/g, '');  // Emoji presentation

    // Remove skin tone modifiers if requested
    const removeSkinTones = false; // Could be configurable
    if (removeSkinTones) {
      text = text.replace(/[\u{1F3FB}-\u{1F3FF}]/gu, '');
    }

    let result = `Original length: ${original.length}\n`;
    result += `Stripped length: ${text.length}\n`;
    result += `Removed: ${original.length - text.length} characters\n\n`;

    result += `=== RESULT ===\n`;
    result += text + '\n\n';

    result += `=== INFO ===\n`;
    result += `FE0E: Text presentation selector (removed)\n`;
    result += `FE0F: Emoji presentation selector (removed)\n\n`;

    if (original.length === text.length) {
      result += `No variation selectors found.`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Failed to strip variants: " + error.message);
  }
}
