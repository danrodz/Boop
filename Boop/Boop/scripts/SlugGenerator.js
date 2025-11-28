/**
  {
    "api": 1,
    "name": "Slug Generator",
    "description": "Generate URL-friendly slugs from text",
    "author": "Boop",
    "icon": "link",
    "tags": "slug,url,seo,friendly,convert"
  }
**/

function main(state) {
  try {
    const text = state.text.trim();

    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, ''); // Trim hyphens from start/end

    state.text = slug;
    state.postInfo("Slug generated");
  } catch (error) {
    state.postError("Error generating slug: " + error.message);
  }
}
