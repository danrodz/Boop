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
  let slug = String(state.text || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')                 // decompose accents
    .replace(/[\u0300-\u036f]/g, '')  // remove diacritics
    .replace(/[^a-z0-9]+/g, '-')      // non-alnum → hyphen
    .replace(/^-+|-+$/g, '')          // trim hyphens
    .replace(/-+/g, '-')              // collapse hyphens
    .substring(0, 100);               // limit length

  if (!slug) {
    if (typeof state.postError === 'function') {
      state.postError("No valid characters for slug");
    }
    return;
  }

  state.text = slug;

  if (typeof state.postInfo === 'function') {
    state.postInfo("Generated URL slug");
  }
}
