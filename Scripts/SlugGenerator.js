/**
  {
    "api": 1,
    "name": "Generate URL Slug",
    "description": "Convert text to URL-friendly slug",
    "author": "Boop",
    "icon": "link",
    "tags": "slug,url,seo,format,text"
  }
**/

function main(state) {
  let slug = state.text
    .toLowerCase()
    .trim()
    // Remove accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and special chars with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Replace multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Limit length
    .substring(0, 100);

  state.text = slug;
  state.postInfo("Generated URL slug");
}
