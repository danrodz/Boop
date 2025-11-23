/**
  {
    "api": 1,
    "name": "Estimate Read Time",
    "description": "Estimates reading time for text content",
    "author": "Boop",
    "icon": "clock",
    "tags": "read,time,estimate,words,article"
  }
**/

function main(state) {
  var text = state.text;
  
  // Remove code blocks for accurate word count
  var cleanText = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]+`/g, "");
  
  // Count words
  var words = cleanText.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;
  
  // Count code blocks separately
  var codeBlocks = (text.match(/```[\s\S]*?```/g) || []);
  var codeLines = 0;
  codeBlocks.forEach(function(block) {
    codeLines += block.split("\n").length;
  });
  
  // Count images (markdown)
  var images = (text.match(/!\[[^\]]*\]\([^)]+\)/g) || []).length;
  
  // Reading speed assumptions
  var wordsPerMinute = 200; // Average adult reading speed
  var codeSecondsPerLine = 3; // Time to read a line of code
  var imageSeconds = 12; // Time to look at an image
  
  var textMinutes = words / wordsPerMinute;
  var codeMinutes = (codeLines * codeSecondsPerLine) / 60;
  var imageMinutes = (images * imageSeconds) / 60;
  
  var totalMinutes = textMinutes + codeMinutes + imageMinutes;
  var roundedMinutes = Math.ceil(totalMinutes);
  
  var readSpeed;
  if (roundedMinutes <= 3) readSpeed = "Quick read";
  else if (roundedMinutes <= 7) readSpeed = "Medium read";
  else if (roundedMinutes <= 15) readSpeed = "Long read";
  else readSpeed = "In-depth article";
  
  var output = [
    "Estimated Read Time: " + roundedMinutes + " min",
    "Category: " + readSpeed,
    "",
    "Breakdown:",
    "  Words: " + words.toLocaleString(),
    "  Code lines: " + codeLines,
    "  Images: " + images,
    "",
    "Time breakdown:",
    "  Text: " + textMinutes.toFixed(1) + " min",
    "  Code: " + codeMinutes.toFixed(1) + " min",
    "  Images: " + imageMinutes.toFixed(1) + " min",
    "",
    "Based on:",
    "  " + wordsPerMinute + " words/min reading speed",
    "  " + codeSecondsPerLine + " sec per line of code",
    "  " + imageSeconds + " sec per image"
  ];
  
  state.text = output.join("\n");
  state.postInfo(roundedMinutes + " min read (" + words + " words)");
}
