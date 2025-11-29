/**
  {
    "api": 1,
    "name": "HTML Strip Tags",
    "description": "Removes all HTML tags, keeps text content",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "html,strip,tags,remove,text"
  }
**/

function main(state) {
  let text = state.text;

  // Remove script and style tags entirely
  text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Replace block elements with newlines
  text = text.replace(/<\/(p|div|h[1-6]|li|tr|br|hr)[^>]*>/gi, '\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Remove remaining tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  text = textarea.value;

  // Clean up whitespace
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n\s*\n/g, '\n\n');
  text = text.trim();

  state.text = text;
}
