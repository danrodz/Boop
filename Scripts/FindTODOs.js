/**
  {
    "api": 1,
    "name": "Find TODO Comments",
    "description": "Extract all TODO, FIXME, and HACK comments from code",
    "author": "Boop",
    "icon": "list",
    "tags": "todo,fixme,comments,extract,code-quality"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const todos = [];
  const fixmes = [];
  const hacks = [];
  const notes = [];

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const trimmed = line.trim();

    if (/TODO:/i.test(trimmed)) {
      const comment = trimmed.replace(/^.*TODO:\s*/i, '');
      todos.push(`Line ${lineNum}: ${comment}`);
    }

    if (/FIXME:/i.test(trimmed)) {
      const comment = trimmed.replace(/^.*FIXME:\s*/i, '');
      fixmes.push(`Line ${lineNum}: ${comment}`);
    }

    if (/HACK:/i.test(trimmed)) {
      const comment = trimmed.replace(/^.*HACK:\s*/i, '');
      hacks.push(`Line ${lineNum}: ${comment}`);
    }

    if (/NOTE:/i.test(trimmed)) {
      const comment = trimmed.replace(/^.*NOTE:\s*/i, '');
      notes.push(`Line ${lineNum}: ${comment}`);
    }
  });

  const total = todos.length + fixmes.length + hacks.length + notes.length;

  if (total === 0) {
    state.text = '✓ No TODO/FIXME/HACK/NOTE comments found';
    state.postInfo("No action items found");
    return;
  }

  let output = `Code Action Items (${total} total)\n\n`;

  if (todos.length > 0) {
    output += `📝 TODO (${todos.length}):\n`;
    todos.forEach(todo => output += `  ${todo}\n`);
    output += '\n';
  }

  if (fixmes.length > 0) {
    output += `🔧 FIXME (${fixmes.length}):\n`;
    fixmes.forEach(fixme => output += `  ${fixme}\n`);
    output += '\n';
  }

  if (hacks.length > 0) {
    output += `⚠️  HACK (${hacks.length}):\n`;
    hacks.forEach(hack => output += `  ${hack}\n`);
    output += '\n';
  }

  if (notes.length > 0) {
    output += `📌 NOTE (${notes.length}):\n`;
    notes.forEach(note => output += `  ${note}\n`);
  }

  state.text = output;
  state.postInfo(`Found ${total} action item(s)`);
}
