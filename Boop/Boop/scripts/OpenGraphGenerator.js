/**
  {
    "api": 1,
    "name": "Open Graph Generator",
    "description": "Generate Open Graph meta tags (input: title, description, url, image on separate lines)",
    "author": "Boop",
    "icon": "square.and.arrow.up",
    "tags": "opengraph,og,meta,social,facebook"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    const title = lines[0] || 'Page Title';
    const description = lines[1] || 'Page description';
    const url = lines[2] || 'https://example.com';
    const image = lines[3] || 'https://example.com/image.jpg';

    const og = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">`;

    state.text = og;
  } catch (error) {
    state.postError("Error generating Open Graph tags: " + error.message);
  }
}
