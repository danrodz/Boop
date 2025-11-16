/**
{
  "api": 1,
  "name": "Strip Markdown",
  "description": "Remove all Markdown formatting and keep only plain text content",
  "author":"danrodz",
  "icon": "text",
  "tags": "markdown,strip,plain text,remove formatting"
}
**/

function main(state) {
  try {
    state.text = stripMarkdown(state.text);
  } catch (error) {
    state.postError("Error stripping Markdown: " + error.message);
  }
}

function stripMarkdown(markdown) {
  if (!markdown || markdown.trim() === '') {
    return '';
  }

  let text = markdown;

  // Remove code blocks (``` ```)
  text = text.replace(/```[\s\S]*?```/g, '');

  // Remove inline code (`code`)
  text = text.replace(/`([^`]+)`/g, '$1');

  // Remove images ![alt](url)
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');

  // Remove links but keep the text [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove bold (**text** or __text__)
  text = text.replace(/\*\*(.+?)\*\*/g, '$1');
  text = text.replace(/__(.+?)__/g, '$1');

  // Remove italic (*text* or _text_)
  text = text.replace(/\*(.+?)\*/g, '$1');
  text = text.replace(/_(.+?)_/g, '$1');

  // Remove strikethrough (~~text~~)
  text = text.replace(/~~(.+?)~~/g, '$1');

  // Remove headers (# ## ### etc.) but keep the text
  text = text.replace(/^#{1,6}\s+/gm, '');

  // Remove blockquotes (>) but keep the text
  text = text.replace(/^>\s+/gm, '');

  // Remove horizontal rules (---, ***, ___)
  text = text.replace(/^[\*\-_]{3,}\s*$/gm, '');

  // Remove unordered list markers (*, -, +)
  text = text.replace(/^[\*\-\+]\s+/gm, '');

  // Remove ordered list markers (1., 2., etc.)
  text = text.replace(/^\d+\.\s+/gm, '');

  // Remove HTML tags (if any)
  text = text.replace(/<[^>]+>/g, '');

  // Clean up multiple blank lines
  text = text.replace(/\n{3,}/g, '\n\n');

  // Trim leading and trailing whitespace
  text = text.trim();

  return text;
}
