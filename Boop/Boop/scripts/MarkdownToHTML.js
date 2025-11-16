/**
{
  "api": 1,
  "name": "Markdown to HTML",
  "description": "Convert Markdown to HTML with support for headers, bold, italic, links, code blocks, and lists",
  "author":"danrodz",
  "icon": "code",
  "tags": "markdown,html,convert"
}
**/

function main(state) {
  try {
    state.text = markdownToHTML(state.text);
  } catch (error) {
    state.postError("Error converting Markdown to HTML: " + error.message);
  }
}

function markdownToHTML(markdown) {
  if (!markdown || markdown.trim() === '') {
    return '';
  }

  let html = markdown;

  // Convert code blocks first (before inline code)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const langAttr = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${langAttr}>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Split into lines for processing
  const lines = html.split('\n');
  const result = [];
  let inList = false;
  let listType = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip lines that are already processed code blocks
    if (line.includes('<pre><code') || line.includes('</code></pre>')) {
      if (inList) {
        result.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
        listType = null;
      }
      result.push(line);
      continue;
    }

    // Headers (must come before other conversions to preserve the line)
    if (/^#{1,6}\s+/.test(line)) {
      if (inList) {
        result.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
        listType = null;
      }
      const level = line.match(/^(#{1,6})/)[1].length;
      const text = line.replace(/^#{1,6}\s+/, '').trim();
      result.push(`<h${level}>${convertInlineFormatting(text)}</h${level}>`);
      continue;
    }

    // Unordered lists
    if (/^[\*\-]\s+/.test(line)) {
      const text = line.replace(/^[\*\-]\s+/, '').trim();
      if (!inList || listType !== 'ul') {
        if (inList) {
          result.push('</ol>');
        }
        result.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      result.push(`  <li>${convertInlineFormatting(text)}</li>`);
      continue;
    }

    // Ordered lists
    if (/^\d+\.\s+/.test(line)) {
      const text = line.replace(/^\d+\.\s+/, '').trim();
      if (!inList || listType !== 'ol') {
        if (inList) {
          result.push('</ul>');
        }
        result.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      result.push(`  <li>${convertInlineFormatting(text)}</li>`);
      continue;
    }

    // Close list if we're no longer in list items
    if (inList && line.trim() !== '') {
      result.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
      listType = null;
    }

    // Empty lines
    if (line.trim() === '') {
      if (!inList) {
        result.push('');
      }
      continue;
    }

    // Regular paragraphs
    result.push(`<p>${convertInlineFormatting(line)}</p>`);
  }

  // Close any open lists
  if (inList) {
    result.push(listType === 'ul' ? '</ul>' : '</ol>');
  }

  return result.join('\n');
}

function convertInlineFormatting(text) {
  // Skip if already contains HTML tags (like code)
  if (text.includes('<code>')) {
    // Still process the parts outside code tags
    return text.replace(/(<code>.*?<\/code>)|(\*\*(.+?)\*\*)|(\*(.+?)\*)|(__(.+?)__)|(_(.+?)_)|(\[([^\]]+)\]\(([^)]+)\))/g,
      (match, code, boldStar, boldStarText, italicStar, italicStarText, boldUnderscore, boldUnderscoreText, italicUnderscore, italicUnderscoreText, link, linkText, linkUrl) => {
        if (code) return code;
        if (boldStar) return `<strong>${boldStarText}</strong>`;
        if (italicStar) return `<em>${italicStarText}</em>`;
        if (boldUnderscore) return `<strong>${boldUnderscoreText}</strong>`;
        if (italicUnderscore) return `<em>${italicUnderscoreText}</em>`;
        if (link) return `<a href="${linkUrl}">${linkText}</a>`;
        return match;
      }
    );
  }

  // Convert bold (** or __)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Convert italic (* or _)
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');

  // Convert links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  return text;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
