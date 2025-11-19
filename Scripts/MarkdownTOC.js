/**
  {
    "api": 1,
    "name": "Markdown Table of Contents",
    "description": "Generate TOC from markdown headers",
    "author": "Boop",
    "icon": "list.bullet.indent",
    "tags": "markdown,toc,tableofcontents,headers"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const lines = text.split('\n');
    const headers = [];

    // Extract headers
    for (let line of lines) {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const title = match[2].replace(/\[(.+?)\]\(.+?\)/g, '$1'); // Remove links
        const anchor = title.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        headers.push({ level, title, anchor });
      }
    }

    if (headers.length === 0) {
      state.postInfo("No headers found in markdown");
      return;
    }

    // Generate TOC
    let toc = '## Table of Contents\n\n';

    for (let header of headers) {
      const indent = '  '.repeat(header.level - 1);
      toc += `${indent}- [${header.title}](#${header.anchor})\n`;
    }

    toc += `\n---\n\n${text}`;

    state.text = toc;
  } catch (error) {
    state.postError("TOC generation failed: " + error.message);
  }
}
