/**
  {
    "api": 1,
    "name": "Alt Text Generator",
    "description": "Generate descriptive alt text suggestions from image filename",
    "author": "Boop",
    "icon": "photo",
    "tags": "alt,text,image,accessibility,seo"
  }
**/

function main(state) {
  try {
    const filename = state.text.trim();

    // Remove extension
    const name = filename.replace(/\.[^/.]+$/, '');

    // Convert various separators to spaces
    let alt = name
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase to spaces
      .replace(/\s+/g, ' ')
      .trim();

    // Capitalize first letter
    alt = alt.charAt(0).toUpperCase() + alt.slice(1);

    const suggestions = [
      alt,
      `Image of ${alt.toLowerCase()}`,
      `${alt} photo`,
      `${alt} illustration`
    ];

    const result = [
      'Alt Text Suggestions:',
      '',
      ...suggestions.map((s, i) => `${i + 1}. ${s}`),
      '',
      'Tips:',
      '- Be specific and descriptive',
      '- Avoid "image of" or "picture of" (unless needed for context)',
      '- Keep it under 125 characters',
      '- Describe what\'s important about the image'
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error generating alt text: " + error.message);
  }
}
