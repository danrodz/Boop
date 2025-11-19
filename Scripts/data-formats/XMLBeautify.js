/**
  {
    "api": 1,
    "name": "XML Beautify",
    "description": "Formats XML with proper indentation",
    "author": "Boop",
    "icon": "arrow.up.left.and.arrow.down.right",
    "tags": "xml,beautify,format,pretty"
  }
**/

function beautifyXML(xml) {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  xml.split(/>\s*</).forEach(node => {
    if (node.match(/^\/\w/)) indent--;
    formatted += tab.repeat(indent) + '<' + node + '>\n';
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent++;
  });

  return formatted.substring(1, formatted.length - 2);
}

function main(state) {
  try {
    state.text = beautifyXML(state.text.trim());
  } catch (error) {
    state.postError("Failed to beautify XML: " + error.message);
  }
}
