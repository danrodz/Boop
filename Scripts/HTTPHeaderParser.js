/**
  {
    "api": 1,
    "name": "HTTP Headers to JSON",
    "description": "Parses raw HTTP headers to JSON object",
    "author": "Boop",
    "icon": "network",
    "tags": "http,headers,parse,json,request,response"
  }
**/

function main(state) {
  var lines = state.text.trim().split("\n");
  var result = {};
  var firstLine = null;
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) continue;
    
    // Check for request/response first line
    if (i === 0) {
      if (/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+/.test(line)) {
        var reqMatch = line.match(/^(\w+)\s+(\S+)\s*(HTTP\/[\d.]+)?/);
        if (reqMatch) {
          firstLine = {
            type: "request",
            method: reqMatch[1],
            path: reqMatch[2],
            protocol: reqMatch[3] || "HTTP/1.1"
          };
          continue;
        }
      } else if (/^HTTP\//.test(line)) {
        var resMatch = line.match(/^(HTTP\/[\d.]+)\s+(\d+)\s*(.*)?/);
        if (resMatch) {
          firstLine = {
            type: "response",
            protocol: resMatch[1],
            status: parseInt(resMatch[2]),
            statusText: resMatch[3] || ""
          };
          continue;
        }
      }
    }
    
    // Parse header line
    var colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      var name = line.substring(0, colonIndex).trim();
      var value = line.substring(colonIndex + 1).trim();
      
      // Handle duplicate headers
      if (result[name]) {
        if (Array.isArray(result[name])) {
          result[name].push(value);
        } else {
          result[name] = [result[name], value];
        }
      } else {
        result[name] = value;
      }
    }
  }
  
  var output = {};
  if (firstLine) {
    output._request = firstLine;
  }
  output.headers = result;
  
  state.text = JSON.stringify(output, null, 2);
  state.postInfo("Parsed " + Object.keys(result).length + " headers");
}
