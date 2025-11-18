/**
  {
    "api": 1,
    "name": "Normalize Line Breaks",
    "description": "Converts all line breaks to LF (\\n)",
    "author": "Boop",
    "icon": "return",
    "tags": "linebreaks,normalize,newline,lf,crlf"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  } catch (error) {
    state.postError("Failed to normalize line breaks");
  }
}
