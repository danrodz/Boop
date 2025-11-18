/**
  {
    "api": 1,
    "name": "Strip HTML Tags",
    "description": "Removes all HTML tags from text, keeping only content",
    "author": "Boop",
    "icon": "code",
    "tags": "strip,remove,html,tags,clean"
  }
**/

function main(state) {
  try {
    // Remove HTML tags
    let text = state.text.replace(/<[^>]*>/g, '');

    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    state.text = text;
  } catch (error) {
    state.postError("Failed to strip HTML tags");
  }
}
