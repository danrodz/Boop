/**
  {
    "api": 1,
    "name": "Reverse Words",
    "description": "Reverses the order of words in each line",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "reverse,words,order,flip,swap"
  }
**/

function main(state) {
  state.text = state.text
    .split('\n')
    .map(line => line.split(/\s+/).reverse().join(' '))
    .join('\n');
  
  state.postInfo("Words reversed");
}
