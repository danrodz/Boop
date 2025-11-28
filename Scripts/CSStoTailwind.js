/**
  {
    "api": 1,
    "name": "CSS to Tailwind Classes",
    "description": "Convert common CSS properties to Tailwind utility classes",
    "author": "Boop",
    "icon": "palette",
    "tags": "css,tailwind,convert,utility,classes"
  }
**/

function main(state) {
  const cssToTailwind = {
    'display: flex': 'flex',
    'display: block': 'block',
    'display: inline': 'inline',
    'display: none': 'hidden',
    'flex-direction: column': 'flex-col',
    'flex-direction: row': 'flex-row',
    'justify-content: center': 'justify-center',
    'justify-content: space-between': 'justify-between',
    'align-items: center': 'items-center',
    'text-align: center': 'text-center',
    'text-align: left': 'text-left',
    'text-align: right': 'text-right',
    'font-weight: bold': 'font-bold',
    'margin: 0': 'm-0',
    'padding: 0': 'p-0',
    'width: 100%': 'w-full',
    'height: 100%': 'h-full'
  };

  let classes = [];
  const lines = state.text.split('\n').map(l => l.trim()).filter(l => l);

  for (const line of lines) {
    const normalized = line.replace(/;$/, '').trim();
    if (cssToTailwind[normalized]) {
      classes.push(cssToTailwind[normalized]);
    }
  }

  if (classes.length > 0) {
    state.text = classes.join(' ');
    state.postInfo(`Converted ${classes.length} CSS properties to Tailwind`);
  } else {
    state.postError("No matching CSS properties found");
  }
}
