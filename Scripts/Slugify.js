/**
  {
    "api": 1,
    "name": "Slugify",
    "description": "Converts text to URL-friendly slug",
    "author": "Boop",
    "icon": "link",
    "tags": "slug,url,kebab,lowercase,permalink"
  }
**/

function main(state) {
  state.text = state.text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/[\s_]+/g, '-') // Spaces/underscores to hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, ''); // Trim hyphens from ends
  
  state.postInfo("Text slugified");
}
