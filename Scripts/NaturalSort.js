/**
  {
    "api": 1,
    "name": "Natural Sort Lines",
    "description": "Sorts lines naturally (file1, file2, file10 not file1, file10, file2)",
    "author": "Boop",
    "icon": "arrow.up.arrow.down",
    "tags": "sort,natural,human,numeric,lines"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  
  function naturalCompare(a, b) {
    var ax = [], bx = [];
    
    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]); });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]); });
    
    while (ax.length && bx.length) {
      var an = ax.shift();
      var bn = bx.shift();
      var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }
    
    return ax.length - bx.length;
  }
  
  lines.sort(naturalCompare);
  state.text = lines.join("\n");
  state.postInfo("Sorted " + lines.length + " lines naturally");
}
