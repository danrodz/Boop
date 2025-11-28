/**
  {
    "api": 1,
    "name": "Number Lines",
    "description": "Add line numbers to text",
    "author": "Boop",
    "icon": "list",
    "tags": "number,lines,prefix,text"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const maxDigits = String(lines.length).length;

  const numbered = lines.map((line, index) => {
    const lineNum = String(index + 1).padStart(maxDigits, ' ');
    return `${lineNum}. ${line}`;
  });

  state.text = numbered.join('\n');
  state.postInfo("Added line numbers");
}
