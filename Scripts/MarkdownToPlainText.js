/**
  {
    "api": 1,
    "name": "Markdown to Plain Text",
    "description": "Removes Markdown formatting",
    "author": "Boop",
    "icon": "doc.plaintext.fill",
    "tags": "markdown,plain,text,strip,remove"
  }
**/

function main(state) {
  let text = state.text;

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');

  // Remove headers
  text = text.replace(/^#{1,6}\s+/gm, '');

  // Remove bold and italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '$1');
  text = text.replace(/\*\*(.+?)\*\*/g, '$1');
  text = text.replace(/\*(.+?)\*/g, '$1');
  text = text.replace(/___(.+?)___/g, '$1');
  text = text.replace(/__(.+?)__/g, '$1');
  text = text.replace(/_(.+?)_/g, '$1');

  // Remove links but keep text
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // Remove images
  text = text.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '');

  // Remove blockquotes
  text = text.replace(/^>\s*/gm, '');

  // Remove horizontal rules
  text = text.replace(/^[-*_]{3,}\s*$/gm, '');

  // Remove list markers
  text = text.replace(/^\s*[-*+]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');

  // Clean up extra whitespace
  text = text.replace(/\n{3,}/g, '\n\n');

  state.text = text.trim();
}
