/**
  {
    "api": 1,
    "name": "Bracket Matcher",
    "description": "Validates bracket matching and shows errors",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "brackets,parentheses,validate,match,syntax"
  }
**/

function main(state) {
  var text = state.text;
  var stack = [];
  var pairs = {"(": ")", "[": "]", "{": "}", "<": ">"};
  var opens = Object.keys(pairs);
  var closes = Object.values(pairs);
  var errors = [];
  var lineNum = 1;
  var colNum = 0;
  
  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    colNum++;
    
    if (char === "\n") {
      lineNum++;
      colNum = 0;
      continue;
    }
    
    if (opens.indexOf(char) > -1) {
      stack.push({char: char, line: lineNum, col: colNum, pos: i});
    } else if (closes.indexOf(char) > -1) {
      if (stack.length === 0) {
        errors.push("Unexpected '" + char + "' at line " + lineNum + ", col " + colNum);
      } else {
        var last = stack.pop();
        if (pairs[last.char] !== char) {
          errors.push("Mismatched bracket: expected '" + pairs[last.char] + "' but found '" + char + "' at line " + lineNum + ", col " + colNum + " (opening '" + last.char + "' at line " + last.line + ", col " + last.col + ")");
        }
      }
    }
  }
  
  // Check for unclosed brackets
  while (stack.length > 0) {
    var unclosed = stack.pop();
    errors.push("Unclosed '" + unclosed.char + "' at line " + unclosed.line + ", col " + unclosed.col);
  }
  
  if (errors.length === 0) {
    state.text = "All brackets are properly matched!";
    state.postInfo("Brackets valid");
  } else {
    state.text = "Found " + errors.length + " bracket error(s):\n\n" + errors.join("\n");
    state.postError(errors.length + " bracket error(s)");
  }
}
