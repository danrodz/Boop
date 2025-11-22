/**
  {
    "api": 1,
    "name": "Alphabetize Words",
    "description": "Sorts words alphabetically in each line",
    "author": "Boop",
    "icon": "textformat.abc",
    "tags": "alphabetize,sort,words,order,abc"
  }
**/

function main(state) {
  state.text = state.text
    .split('\n')
    .map(line => line.split(/\s+/).sort((a, b) => a.localeCompare(b)).join(' '))
    .join('\n');
  
  state.postInfo("Words alphabetized");
}
