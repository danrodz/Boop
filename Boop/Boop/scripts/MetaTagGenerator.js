/**
  {
    "api": 1,
    "name": "Meta Tag Generator",
    "description": "Generate HTML meta tags (input: title, description, keywords on separate lines)",
    "author": "Boop",
    "icon": "tag",
    "tags": "meta,tag,seo,html,head"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    const title = lines[0] || 'Page Title';
    const description = lines[1] || 'Page description';
    const keywords = lines[2] || 'keyword1, keyword2, keyword3';

    const meta = `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="Your Name">
  <title>${title}</title>
</head>`;

    state.text = meta;
  } catch (error) {
    state.postError("Error generating meta tags: " + error.message);
  }
}
