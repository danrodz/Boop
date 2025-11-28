/**
  {
    "api": 1,
    "name": "Twitter Card Generator",
    "description": "Generate Twitter Card meta tags (input: title, description, image on separate lines)",
    "author": "Boop",
    "icon": "bird",
    "tags": "twitter,card,meta,social,x"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    const title = lines[0] || 'Page Title';
    const description = lines[1] || 'Page description';
    const image = lines[2] || 'https://example.com/image.jpg';

    const twitter = `<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">`;

    state.text = twitter;
  } catch (error) {
    state.postError("Error generating Twitter Card tags: " + error.message);
  }
}
