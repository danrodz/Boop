/**
  {
    "api": 1,
    "name": "Convert Newlines (Windows)",
    "description": "Converts all newlines to Windows format (CRLF)",
    "author": "Boop",
    "icon": "arrow.turn.down.left",
    "tags": "newline,windows,crlf,convert,eol"
  }
**/

function main(state) {
  const original = state.text;
  // First normalize to LF, then convert to CRLF
  const converted = original.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '\r\n');

  const lfCount = (original.match(/(?<!\r)\n/g) || []).length;

  state.text = converted;

  if (lfCount > 0) {
    state.postInfo(`Converted ${lfCount} LF to CRLF`);
  } else {
    state.postInfo('Already using Windows line endings (CRLF)');
  }
}
