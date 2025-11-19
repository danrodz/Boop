/**
  {
    "api": 1,
    "name": "Markdown Table of Contents",
    "description": "Generates TOC from Markdown headings",
    "author": "Boop",
    "icon": "list.bullet.indent",
    "tags": "markdown,toc,table,contents,headings"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const toc = [];

  for (const line of lines) {
    // Match markdown headings
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const heading = match[2].trim();

      // Create anchor link (GitHub style)
      const anchor = heading
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      // Create indented list item
      const indent = '  '.repeat(level - 1);
      toc.push(`${indent}- [${heading}](#${anchor})`);
    }
  }

  if (toc.length === 0) {
    state.postError("No Markdown headings found");
    return;
  }

  state.text = '## Table of Contents\n\n' + toc.join('\n');
}
