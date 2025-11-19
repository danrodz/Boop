/**
  {
    "api": 1,
    "name": "Markdown to HTML",
    "description": "Convert Markdown to HTML",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,html,convert"
  }
**/

function main(state) {
  try {
    let text = state.text;

    // Headers
    text = text.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    text = text.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    text = text.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    text = text.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    text = text.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    text = text.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Bold and italic
    text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    text = text.replace(/_(.+?)_/g, '<em>$1</em>');

    // Code
    text = text.replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    text = text.replace(/`(.+?)`/g, '<code>$1</code>');

    // Links and images
    text = text.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

    // Lists
    text = text.replace(/^\*\s+(.+)$/gm, '<li>$1</li>');
    text = text.replace(/^-\s+(.+)$/gm, '<li>$1</li>');
    text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

    // Blockquotes
    text = text.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

    // Horizontal rule
    text = text.replace(/^---$/gm, '<hr>');

    // Paragraphs (simple approach)
    text = text.replace(/\n\n/g, '</p>\n<p>');
    text = '<p>' + text + '</p>';

    state.text = text;
  } catch (error) {
    state.postError("Conversion failed: " + error.message);
  }
}
