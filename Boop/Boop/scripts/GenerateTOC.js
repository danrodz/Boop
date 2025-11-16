/**
{
  "api": 1,
  "name": "Generate Table of Contents",
  "description": "Generate a table of contents from Markdown headers with nested structure",
  "author": "Boop",
  "icon": "list",
  "tags": "markdown,toc,table of contents,headers"
}
**/

function main(state) {
  try {
    const toc = generateTableOfContents(state.text);
    if (toc === '') {
      state.postError("No headers found in the document");
    } else {
      state.text = toc;
    }
  } catch (error) {
    state.postError("Error generating table of contents: " + error.message);
  }
}

function generateTableOfContents(markdown) {
  if (!markdown || markdown.trim() === '') {
    return '';
  }

  const lines = markdown.split('\n');
  const headers = [];

  // Extract all headers
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      // Remove any markdown formatting from header text
      const cleanText = stripMarkdownFormatting(text);
      const anchor = generateAnchor(cleanText);
      headers.push({ level, text: cleanText, anchor });
    }
  }

  if (headers.length === 0) {
    return '';
  }

  // Find the minimum header level to use as base
  const minLevel = Math.min(...headers.map(h => h.level));

  // Generate the TOC
  const toc = [];
  toc.push('## Table of Contents\n');

  for (const header of headers) {
    const indent = '  '.repeat(header.level - minLevel);
    toc.push(`${indent}- [${header.text}](#${header.anchor})`);
  }

  return toc.join('\n');
}

function stripMarkdownFormatting(text) {
  // Remove bold, italic, code, and links
  let clean = text;
  clean = clean.replace(/\*\*(.+?)\*\*/g, '$1');  // bold **
  clean = clean.replace(/__(.+?)__/g, '$1');      // bold __
  clean = clean.replace(/\*(.+?)\*/g, '$1');      // italic *
  clean = clean.replace(/_(.+?)_/g, '$1');        // italic _
  clean = clean.replace(/`(.+?)`/g, '$1');        // code
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');  // links
  return clean.trim();
}

function generateAnchor(text) {
  // Convert header text to GitHub-style anchor
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-')        // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
}
