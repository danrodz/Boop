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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
  ];

  const raw = (state.text || '').trim();
  let count = parseInt(raw, 10);
  if (isNaN(count)) count = 3;
  if (count < 1) count = 1;
  if (count > 20) count = 20;

  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(paragraphs[i % paragraphs.length]);
  }

  state.text = result.join('\n\n');
  if (typeof state.postInfo === 'function') {
    state.postInfo(`Generated ${count} Lorem Ipsum paragraph(s)`);
  }
}
