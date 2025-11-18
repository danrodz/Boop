/**
{
  "api": 1,
  "name": "Slugify Text",
  "description": "Converts text to URL-friendly slug",
  "author": "Boop",
  "icon": "link",
  "tags": "slug,url,kebab,seo"
}
**/

function main(state) {
  state.text = state.text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
