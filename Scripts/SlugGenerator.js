/**
  {
    "api": 1,
    "name": "Slug Generator",
    "description": "Generates URL-friendly slugs from text",
    "author": "Boop",
    "icon": "link.circle.fill",
    "tags": "slug,url,seo,permalink,sanitize"
  }
**/

function main(state) {
  let text = state.text.trim();

  // Convert to lowercase
  text = text.toLowerCase();

  // Replace accented characters
  const accents = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
    'ñ': 'n', 'ç': 'c', 'ß': 'ss',
    'æ': 'ae', 'œ': 'oe'
  };

  for (const [accented, plain] of Object.entries(accents)) {
    text = text.replace(new RegExp(accented, 'g'), plain);
  }

  // Replace non-alphanumeric characters with hyphens
  text = text.replace(/[^a-z0-9]+/g, '-');

  // Remove leading/trailing hyphens
  text = text.replace(/^-+|-+$/g, '');

  // Replace multiple consecutive hyphens with single hyphen
  text = text.replace(/-{2,}/g, '-');

  if (!text) {
    state.postError("No valid characters for slug");
    return;
  }

  state.text = text;
}
