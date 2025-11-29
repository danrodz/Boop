/**
  {
    "api": 1,
    "name": "Parse Cookies",
    "description": "Parses cookie strings to JSON",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "cookie,parse,json,http,session"
  }
**/

function main(state) {
  var text = state.text.trim();
  var cookies = {};
  
  // Handle both Cookie header format and Set-Cookie format
  var isSetCookie = text.toLowerCase().startsWith("set-cookie:");
  
  if (isSetCookie) {
    // Parse Set-Cookie header
    var setCookieValue = text.replace(/^set-cookie:\s*/i, "");
    var parts = setCookieValue.split(";").map(function(p) { return p.trim(); });
    
    // First part is the cookie itself
    var firstEq = parts[0].indexOf("=");
    if (firstEq > -1) {
      var cookieName = parts[0].substring(0, firstEq);
      var cookieValue = parts[0].substring(firstEq + 1);
      
      var cookie = {
        name: cookieName,
        value: decodeURIComponent(cookieValue)
      };
      
      // Parse attributes
      for (var i = 1; i < parts.length; i++) {
        var part = parts[i];
        var eqIdx = part.indexOf("=");
        var attrName, attrValue;
        
        if (eqIdx > -1) {
          attrName = part.substring(0, eqIdx).toLowerCase();
          attrValue = part.substring(eqIdx + 1);
        } else {
          attrName = part.toLowerCase();
          attrValue = true;
        }
        
        if (attrName === "expires") cookie.expires = attrValue;
        else if (attrName === "max-age") cookie.maxAge = parseInt(attrValue);
        else if (attrName === "domain") cookie.domain = attrValue;
        else if (attrName === "path") cookie.path = attrValue;
        else if (attrName === "secure") cookie.secure = true;
        else if (attrName === "httponly") cookie.httpOnly = true;
        else if (attrName === "samesite") cookie.sameSite = attrValue;
      }
      
      cookies = cookie;
    }
  } else {
    // Parse Cookie header format: name=value; name2=value2
    text = text.replace(/^cookie:\s*/i, "");
    var pairs = text.split(";");
    
    pairs.forEach(function(pair) {
      pair = pair.trim();
      var eqIdx = pair.indexOf("=");
      if (eqIdx > -1) {
        var name = pair.substring(0, eqIdx).trim();
        var value = pair.substring(eqIdx + 1).trim();
        try {
          cookies[name] = decodeURIComponent(value);
        } catch (e) {
          cookies[name] = value;
        }
      }
    });
  }
  
  state.text = JSON.stringify(cookies, null, 2);
  state.postInfo("Parsed cookie(s)");
}
