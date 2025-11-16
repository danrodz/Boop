/**
{
  "api": 1,
  "name": "Word Wrap",
  "description": "Wraps text at specified column width (default 80). Put width as first line to customize.",
  "author": "Boop",
  "icon": "align",
  "tags": "wrap,width,column,format,line"
}
**/

function main(input) {
  try {
    let text = input.text;
    let width = 80;

    if (text.trim().length === 0) {
      input.postError("Input is empty");
      return;
    }

    // Check if first line is a number (custom width)
    const lines = text.split('\n');
    const firstLine = lines[0].trim();

    if (/^\d+$/.test(firstLine) && lines.length > 1) {
      width = parseInt(firstLine, 10);
      if (width < 1) {
        input.postError("Width must be at least 1");
        return;
      }
      // Remove the first line and use remaining text
      text = lines.slice(1).join('\n');
    }

    // Process each paragraph separately to preserve intentional line breaks
    const paragraphs = text.split('\n');
    const wrappedParagraphs = paragraphs.map(paragraph => {
      if (paragraph.trim().length === 0) {
        return paragraph; // Preserve empty lines
      }
      return wrapLine(paragraph, width);
    });

    input.text = wrappedParagraphs.join('\n');
  } catch (error) {
    input.postError("Error wrapping text: " + error.message);
  }
}

function wrapLine(text, width) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    // If word itself is longer than width, split it
    if (word.length > width) {
      if (currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = '';
      }
      // Split long word across multiple lines
      for (let i = 0; i < word.length; i += width) {
        lines.push(word.substring(i, i + width));
      }
      continue;
    }

    // Check if adding this word would exceed width
    const testLine = currentLine.length === 0 ? word : currentLine + ' ' + word;

    if (testLine.length <= width) {
      currentLine = testLine;
    } else {
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  // Add the last line if there's anything left
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines.join('\n');
}
