/**
  {
    "api": 1,
    "name": "Parse URL",
    "description": "Parses URL into all its components",
    "author": "Boop",
    "icon": "link",
    "tags": "url,parse,query,components,http"
  }
**/

function main(state) {
  var url = state.text.trim();
  
  // Add protocol if missing for parsing
  var parseUrl = url;
  if (!/^\w+:\/\//.test(parseUrl)) {
    parseUrl = "https://" + parseUrl;
  }
  
  var pattern = /^(\w+):\/\/(?:([^:@]+)(?::([^@]+))?@)?([^:\/\?#]+)(?::(\d+))?(\/[^\?#]*)?(\?[^#]*)?(#.*)?$/;
  var match = parseUrl.match(pattern);
  
  if (!match) {
    state.postError("Invalid URL format");
    return;
  }
  
  var result = {
    original: url,
    protocol: match[1],
    username: match[2] || null,
    password: match[3] || null,
    hostname: match[4],
    port: match[5] ? parseInt(match[5]) : null,
    pathname: match[6] || "/",
    search: match[7] || null,
    hash: match[8] || null
  };
  
  // Parse query parameters
  if (result.search) {
    result.queryParams = {};
    var queryString = result.search.substring(1);
    var pairs = queryString.split("&");
    
    pairs.forEach(function(pair) {
      var eqIdx = pair.indexOf("=");
      if (eqIdx > -1) {
        var key = decodeURIComponent(pair.substring(0, eqIdx));
        var value = decodeURIComponent(pair.substring(eqIdx + 1));
        
        if (result.queryParams[key]) {
          if (Array.isArray(result.queryParams[key])) {
            result.queryParams[key].push(value);
          } else {
            result.queryParams[key] = [result.queryParams[key], value];
          }
        } else {
          result.queryParams[key] = value;
        }
      } else {
        result.queryParams[decodeURIComponent(pair)] = null;
      }
    });
  }
  
  // Build derived properties
  var defaultPorts = {http: 80, https: 443, ftp: 21};
  result.effectivePort = result.port || defaultPorts[result.protocol] || null;
  result.origin = result.protocol + "://" + result.hostname + (result.port ? ":" + result.port : "");
  result.host = result.hostname + (result.port ? ":" + result.port : "");
  
  state.text = JSON.stringify(result, null, 2);
  state.postInfo("URL parsed");
}
