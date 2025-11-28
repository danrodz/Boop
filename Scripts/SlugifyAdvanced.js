/**
  {
    "api": 1,
    "name": "Advanced Slugify",
    "description": "Convert text to URL-friendly slug with options",
    "author": "Boop",
    "icon": "link",
    "tags": "slug,url,slugify,seo"
  }
**/

function main(state) {
  try {
    let text = state.text.trim();

    // Convert to lowercase
    text = text.toLowerCase();

    // Remove accents and diacritics
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace spaces and underscores with hyphens
    text = text.replace(/[\s_]+/g, '-');

    // Remove special characters
    text = text.replace(/[^a-z0-9-]/g, '');

    // Remove consecutive hyphens
    text = text.replace(/-+/g, '-');

    // Remove leading/trailing hyphens
    text = text.replace(/^-+|-+$/g, '');

    // Alternative: with underscores
    const withUnderscore = text.replace(/-/g, '_');

    // Alternative: camelCase
    const camelCase = text.split('-').map((word, i) =>
      i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');

    let result = `Slug: ${text}\n\n`;
    result += `Alternative formats:\n`;
    result += `With underscores: ${withUnderscore}\n`;
    result += `camelCase: ${camelCase}\n`;
    result += `UPPERCASE: ${text.toUpperCase()}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to slugify: " + error.message);
  }
}
