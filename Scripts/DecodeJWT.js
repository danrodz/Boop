/**
  {
    "api": 1,
    "name": "Decode JWT (Detailed)",
    "description": "Decodes JWT token with validation info and expiry",
    "author": "Boop",
    "icon": "lock.shield",
    "tags": "jwt,token,decode,auth,security"
  }
**/

function main(state) {
  var token = state.text.trim();
  var parts = token.split(".");
  
  if (parts.length !== 3) {
    state.postError("Invalid JWT: expected 3 parts (header.payload.signature)");
    return;
  }
  
  function base64Decode(str) {
    // Handle URL-safe base64
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    // Pad if necessary
    while (str.length % 4) str += "=";
    
    try {
      return decodeURIComponent(atob(str).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(""));
    } catch (e) {
      return atob(str);
    }
  }
  
  var header, payload;
  try {
    header = JSON.parse(base64Decode(parts[0]));
    payload = JSON.parse(base64Decode(parts[1]));
  } catch (e) {
    state.postError("Failed to decode JWT: " + e.message);
    return;
  }
  
  // Format timestamps
  function formatDate(timestamp) {
    if (!timestamp) return "N/A";
    var date = new Date(timestamp * 1000);
    return date.toISOString() + " (" + date.toLocaleString() + ")";
  }
  
  // Check expiration
  var now = Math.floor(Date.now() / 1000);
  var isExpired = payload.exp && payload.exp < now;
  var expiresIn = payload.exp ? payload.exp - now : null;
  var expiryStatus;
  
  if (!payload.exp) {
    expiryStatus = "No expiration set";
  } else if (isExpired) {
    expiryStatus = "EXPIRED " + Math.abs(expiresIn) + " seconds ago";
  } else {
    var mins = Math.floor(expiresIn / 60);
    var hours = Math.floor(mins / 60);
    var days = Math.floor(hours / 24);
    
    if (days > 0) expiryStatus = "Valid for " + days + " day(s)";
    else if (hours > 0) expiryStatus = "Valid for " + hours + " hour(s)";
    else if (mins > 0) expiryStatus = "Valid for " + mins + " minute(s)";
    else expiryStatus = "Valid for " + expiresIn + " second(s)";
  }
  
  var output = [
    "=== JWT DECODED ===",
    "",
    "Status: " + expiryStatus,
    "",
    "--- HEADER ---",
    JSON.stringify(header, null, 2),
    "",
    "--- PAYLOAD ---",
    JSON.stringify(payload, null, 2),
    "",
    "--- TIMESTAMPS ---",
    "Issued At (iat): " + formatDate(payload.iat),
    "Expires (exp): " + formatDate(payload.exp),
    "Not Before (nbf): " + formatDate(payload.nbf),
    "",
    "--- SIGNATURE ---",
    "Algorithm: " + (header.alg || "unknown"),
    "Signature (base64): " + parts[2].substring(0, 43) + "..."
  ];
  
  state.text = output.join("\n");
  state.postInfo(isExpired ? "EXPIRED" : "Valid - " + expiryStatus);
}
