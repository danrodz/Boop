/**
  {
    "api": 1,
    "name": "Canonical URL Generator",
    "description": "Generate canonical URL tag from URL",
    "author": "Boop",
    "icon": "link.circle",
    "tags": "canonical,url,seo,duplicate,content"
  }
**/

function main(state) {
  try {
    const url = state.text.trim();

    if (!url) {
      state.postError("Please provide a URL");
      return;
    }

    // Clean URL (remove query params, fragments)
    let canonical = url.split('?')[0].split('#')[0];

    // Ensure protocol
    if (!canonical.match(/^https?:\/\//)) {
      canonical = 'https://' + canonical;
    }

    // Remove trailing slash (except for root)
    if (canonical.endsWith('/') && canonical.split('/').length > 4) {
      canonical = canonical.slice(0, -1);
    }

    const tag = `<link rel="canonical" href="${canonical}" />`;

    state.text = tag;
  } catch (error) {
    state.postError("Error generating canonical URL: " + error.message);
  }
}
