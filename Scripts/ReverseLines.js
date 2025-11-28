/**
  {
    "api": 1,
    "name": "Reverse Line Order",
    "description": "Reverse the order of lines",
    "author": "Boop",
    "icon": "reverse",
    "tags": "reverse,lines,order,text"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const reversed = lines.reverse();

  state.text = reversed.join('\n');
  state.postInfo("Reversed line order");
}
