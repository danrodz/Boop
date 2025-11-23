/**
  {
    "api": 1,
    "name": "Extract Code Blocks",
    "description": "Extracts fenced code blocks from Markdown",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "markdown,code,extract,blocks,fence"
  }
**/

function main(state) {
  var text = state.text;
  var pattern = /```(\w*)\n([\s\S]*?)```/g;
  var blocks = [];
  var match;
  
  while ((match = pattern.exec(text)) !== null) {
    blocks.push({
      language: match[1] || "unknown",
      code: match[2].trim()
    });
  }
  
  if (blocks.length === 0) {
    state.postError("No code blocks found");
    return;
  }
  
  var output = blocks.map(function(block, idx) {
    return "// Block " + (idx + 1) + " (" + block.language + ")\n" + block.code;
  });
  
  state.text = output.join("\n\n---\n\n");
  state.postInfo("Extracted " + blocks.length + " code block(s)");
}
