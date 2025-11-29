/**
  {
    "api": 1,
    "name": "Simple XPath Query",
    "description": "Extracts elements from XML using simple path (first line: path)",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "xml,xpath,query,extract,parse"
  }
**/

function main(state) {
  var lines = state.text.split("\n");
  var path = lines[0].trim();
  var xml = lines.slice(1).join("\n");
  
  // Simple path parser (supports: /root/child, //element, /root/child[@attr])
  var pathParts = path.split("/").filter(function(p) { return p.length > 0; });
  
  if (pathParts.length === 0) {
    state.postError("Invalid path. Example: /root/child or //element");
    return;
  }
  
  // Extract all tags with their content
  function extractElements(xml, tagName, deep) {
    var results = [];
    var pattern = new RegExp("<" + tagName + "(\\s[^>]*)?>([\\s\\S]*?)<\\/" + tagName + ">|<" + tagName + "(\\s[^>]*)?\\/?>", "gi");
    var match;
    
    while ((match = pattern.exec(xml)) !== null) {
      var attrs = match[1] || match[3] || "";
      var content = match[2] || "";
      results.push({
        full: match[0],
        attrs: attrs,
        content: content
      });
      
      if (deep) {
        var nested = extractElements(content, tagName, true);
        results = results.concat(nested);
      }
    }
    
    return results;
  }
  
  // Parse attribute condition
  function matchesCondition(attrs, condition) {
    if (!condition) return true;
    
    var attrMatch = condition.match(/@(\w+)(?:=["']([^"']+)["'])?/);
    if (!attrMatch) return true;
    
    var attrName = attrMatch[1];
    var attrValue = attrMatch[2];
    
    var attrPattern = new RegExp(attrName + '=["\']([^"\']+)["\']');
    var found = attrs.match(attrPattern);
    
    if (!found) return false;
    if (attrValue && found[1] !== attrValue) return false;
    return true;
  }
  
  var isDeep = path.startsWith("//");
  var results = [{ content: xml }];
  
  pathParts.forEach(function(part) {
    var tagMatch = part.match(/^(\w+)(?:\[([^\]]+)\])?$/);
    if (!tagMatch) return;
    
    var tagName = tagMatch[1];
    var condition = tagMatch[2];
    var newResults = [];
    
    results.forEach(function(r) {
      var elements = extractElements(r.content, tagName, isDeep);
      elements.forEach(function(el) {
        if (matchesCondition(el.attrs, condition)) {
          newResults.push(el);
        }
      });
    });
    
    results = newResults;
    isDeep = false; // Only first segment can be deep
  });
  
  if (results.length === 0) {
    state.text = "No matches found for: " + path;
    state.postError("No matches");
    return;
  }
  
  state.text = "Found " + results.length + " match(es):\n\n" + 
               results.map(function(r, i) { return "--- Result " + (i + 1) + " ---\n" + r.full; }).join("\n\n");
  state.postInfo("Found " + results.length + " match(es)");
}
