/**
  {
    "api": 1,
    "name": "CSS Gradient Generator",
    "description": "Generates CSS gradient from colors (one hex per line)",
    "author": "Boop",
    "icon": "paintbrush",
    "tags": "css,gradient,color,design,generate"
  }
**/

function main(state) {
  var lines = state.text.trim().split("\n");
  var colors = [];
  
  lines.forEach(function(line) {
    var color = line.trim().replace("#", "");
    if (/^[0-9a-fA-F]{6}$/.test(color)) {
      colors.push("#" + color.toUpperCase());
    } else if (/^[0-9a-fA-F]{3}$/.test(color)) {
      // Expand 3-char hex
      var expanded = color.split("").map(function(c) { return c + c; }).join("");
      colors.push("#" + expanded.toUpperCase());
    }
  });
  
  if (colors.length < 2) {
    state.postError("Need at least 2 valid hex colors");
    return;
  }
  
  var colorList = colors.join(", ");
  
  var output = [
    "/* Linear Gradients */",
    "background: linear-gradient(to right, " + colorList + ");",
    "background: linear-gradient(to bottom, " + colorList + ");",
    "background: linear-gradient(45deg, " + colorList + ");",
    "background: linear-gradient(135deg, " + colorList + ");",
    "",
    "/* Radial Gradients */",
    "background: radial-gradient(circle, " + colorList + ");",
    "background: radial-gradient(ellipse, " + colorList + ");",
    "",
    "/* Conic Gradient */",
    "background: conic-gradient(" + colorList + ");",
    "",
    "/* With Browser Prefixes */",
    "background: -webkit-linear-gradient(left, " + colorList + ");",
    "background: -moz-linear-gradient(left, " + colorList + ");",
    "background: -o-linear-gradient(left, " + colorList + ");",
    "background: linear-gradient(to right, " + colorList + ");",
    "",
    "/* Repeating Gradients */",
    "background: repeating-linear-gradient(45deg, " + colors.map(function(c, i) {
      return c + " " + (i * 20) + "px";
    }).join(", ") + ", " + colors[0] + " " + (colors.length * 20) + "px);",
    "",
    "/* Colors Used */",
    colors.join("\n")
  ];
  
  state.text = output.join("\n");
  state.postInfo("Generated gradients with " + colors.length + " colors");
}
