/**
  {
    "api": 1,
    "name": "Remove Zero-Width Characters",
    "description": "Removes invisible zero-width characters",
    "author": "Boop",
    "icon": "eye.slash",
    "tags": "zero,width,invisible,hidden,unicode,clean"
  }
**/

function main(state) {
  var zeroWidth = /[\u200B\u200C\u200D\uFEFF\u00AD\u2060]/g;
  var matches = state.text.match(zeroWidth);
  var count = matches ? matches.length : 0;
  
  state.text = state.text.replace(zeroWidth, "");
  state.postInfo("Removed " + count + " zero-width character(s)");
}
