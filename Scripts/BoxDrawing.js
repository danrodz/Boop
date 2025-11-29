/**
  {
    "api": 1,
    "name": "ASCII to Box Drawing",
    "description": "Converts ASCII box chars (+|-) to Unicode box drawing",
    "author": "Boop",
    "icon": "rectangle",
    "tags": "ascii,box,unicode,drawing,table"
  }
**/

function main(state) {
  var text = state.text;
  var lines = text.split("\n");
  
  // Pad lines to same length
  var maxLen = Math.max.apply(null, lines.map(function(l) { return l.length; }));
  lines = lines.map(function(l) {
    while (l.length < maxLen) l += " ";
    return l;
  });
  
  function getChar(r, c) {
    if (r < 0 || r >= lines.length) return " ";
    if (c < 0 || c >= lines[r].length) return " ";
    return lines[r][c];
  }
  
  function isConnector(char) {
    return char === "+" || char === "-" || char === "|";
  }
  
  function isHorizontal(char) {
    return char === "-" || char === "+" || char === "=";
  }
  
  function isVertical(char) {
    return char === "|" || char === "+";
  }
  
  var result = [];
  
  for (var r = 0; r < lines.length; r++) {
    var newLine = "";
    for (var c = 0; c < lines[r].length; c++) {
      var char = lines[r][c];
      
      if (char === "+") {
        var up = isVertical(getChar(r - 1, c));
        var down = isVertical(getChar(r + 1, c));
        var left = isHorizontal(getChar(r, c - 1));
        var right = isHorizontal(getChar(r, c + 1));
        
        // Map to box drawing
        var key = (up ? "1" : "0") + (right ? "1" : "0") + (down ? "1" : "0") + (left ? "1" : "0");
        var boxChars = {
          "0000": "+", "0001": "╴", "0010": "╷", "0011": "┐",
          "0100": "╶", "0101": "─", "0110": "┌", "0111": "┬",
          "1000": "╵", "1001": "┘", "1010": "│", "1011": "┤",
          "1100": "└", "1101": "┴", "1110": "├", "1111": "┼"
        };
        newLine += boxChars[key] || "+";
      } else if (char === "-" || char === "=") {
        newLine += "─";
      } else if (char === "|") {
        newLine += "│";
      } else {
        newLine += char;
      }
    }
    result.push(newLine);
  }
  
  state.text = result.join("\n");
  state.postInfo("Converted to box drawing characters");
}
