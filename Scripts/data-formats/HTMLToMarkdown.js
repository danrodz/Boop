/**
  {
    "api": 1,
    "name": "HTML to Markdown",
    "description": "Converts HTML to Markdown (basic)",
    "author": "Boop",
    "icon": "arrow.left",
    "tags": "html,markdown,convert,transform"
  }
**/

function htmlToMarkdown(html) {
  let md = html;

  // Headers
  md = md.replace(/<h1>(.*?)<\/h1>/gi, '# $1\n');
  md = md.replace(/<h2>(.*?)<\/h2>/gi, '## $1\n');
  md = md.replace(/<h3>(.*?)<\/h3>/gi, '### $1\n');
  md = md.replace(/<h4>(.*?)<\/h4>/gi, '#### $1\n');
  md = md.replace(/<h5>(.*?)<\/h5>/gi, '##### $1\n');
  md = md.replace(/<h6>(.*?)<\/h6>/gi, '###### $1\n');

  // Bold and italic
  md = md.replace(/<(strong|b)>(.*?)<\/(strong|b)>/gi, '**$2**');
  md = md.replace(/<(em|i)>(.*?)<\/(em|i)>/gi, '*$2*');

  // Links
  md = md.replace(/<a\s+href="(.*?)">(.*?)<\/a>/gi, '[$2]($1)');

  // Images
  md = md.replace(/<img\s+src="(.*?)"\s+alt="(.*?)".*?>/gi, '![$2]($1)');

  // Code
  md = md.replace(/<code>(.*?)<\/code>/gi, '`$1`');
  md = md.replace(/<pre>(.*?)<\/pre>/gis, '```\n$1\n```');

  // Lists
  md = md.replace(/<li>(.*?)<\/li>/gi, '- $1\n');
  md = md.replace(/<\/?[ou]l>/gi, '');

  // Paragraphs and line breaks
  md = md.replace(/<p>(.*?)<\/p>/gi, '$1\n\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  return md.trim();
}

function main(state) {
  state.text = htmlToMarkdown(state.text);
}
