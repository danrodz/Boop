/**
  {
    "api": 1,
    "name": "Filename Slugify",
    "description": "Convert filename to safe, URL-friendly format",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "filename,slugify,safe,sanitize"
  }
**/

function main(state) {
  try {
    const filename = state.text.trim();

    // Split filename and extension
    const lastDot = filename.lastIndexOf('.');
    let name = filename;
    let ext = '';

    if (lastDot > 0) {
      name = filename.substring(0, lastDot);
      ext = filename.substring(lastDot);
    }

    // Slugify the name
    const slugified = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')     // Remove special chars
      .replace(/\s+/g, '-')          // Replace spaces with hyphens
      .replace(/-+/g, '-')           // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, '');      // Trim hyphens from start/end

    // Keep extension lowercase
    const safeExt = ext.toLowerCase();

    const result = slugified + safeExt;

    state.text = result;
    state.postInfo("Filename sanitized");
  } catch (error) {
    state.postError("Error slugifying filename: " + error.message);
  }
}
