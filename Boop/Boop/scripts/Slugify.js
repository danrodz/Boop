/**
{
  "api": 1,
  "name": "Slugify",
  "description": "Converts text to URL-friendly slug format",
  "author":"danrodz",
  "icon": "link",
  "tags": "slug,url,kebab,lowercase,hyphen"
}
**/

function main(input) {
  try {
    let text = input.text.trim();

    if (text.length === 0) {
      input.postError("Input is empty");
      return;
    }

    // Convert to lowercase
    let slug = text.toLowerCase();

    // Replace accented characters with their base equivalents
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace spaces and special characters with hyphens
    slug = slug.replace(/[^a-z0-9]+/g, '-');

    // Remove leading and trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');

    // Replace multiple consecutive hyphens with a single hyphen
    slug = slug.replace(/-+/g, '-');

    input.text = slug;
  } catch (error) {
    input.postError("Error creating slug: " + error.message);
  }
}
