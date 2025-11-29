/**
  {
    "api": 1,
    "name": "Convert Newlines (Unix)",
    "description": "Converts all newlines to Unix format (LF)",
    "author": "Boop",
    "icon": "arrow.turn.down.left",
    "tags": "newline,unix,lf,convert,eol"
  }
**/

function main(state) {
  const original = state.text;
  const converted = original.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const crlfCount = (original.match(/\r\n/g) || []).length;
  const crCount = (original.match(/\r(?!\n)/g) || []).length;

  state.text = converted;

  if (crlfCount > 0 || crCount > 0) {
    state.postInfo(`Converted ${crlfCount} CRLF and ${crCount} CR to LF`);
  } else {
    state.postInfo('Already using Unix line endings (LF)');
  }
}
