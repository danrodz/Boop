/**
  {
    "api": 1,
    "name": "Lorem Ipsum (Paragraphs)",
    "description": "Generates specified number of Lorem Ipsum paragraphs",
    "author": "Boop",
    "icon": "text.alignleft",
    "tags": "lorem,ipsum,generate,paragraphs,placeholder"
  }
**/

function main(state) {
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
  ];

  const input = state.text.trim();
  const count = input && !isNaN(input) ? Math.min(Math.max(parseInt(input), 1), 20) : 3;

  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(paragraphs[i % paragraphs.length]);
  }

  state.text = result.join('\n\n');
}
