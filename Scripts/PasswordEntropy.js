/**
  {
    "api": 1,
    "name": "Password Entropy",
    "description": "Calculates password entropy and strength",
    "author": "Boop",
    "icon": "lock.shield",
    "tags": "password,entropy,strength,security,analyze"
  }
**/

function main(state) {
  var password = state.text;
  
  // Character set analysis
  var hasLower = /[a-z]/.test(password);
  var hasUpper = /[A-Z]/.test(password);
  var hasDigits = /\d/.test(password);
  var hasSymbols = /[^a-zA-Z0-9]/.test(password);
  
  // Calculate pool size
  var poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigits) poolSize += 10;
  if (hasSymbols) poolSize += 32; // Common symbols
  
  // Calculate entropy
  var entropy = password.length * Math.log2(poolSize);
  
  // Check for patterns that reduce entropy
  var warnings = [];
  
  // Common sequences
  var sequences = ["123", "abc", "qwerty", "password", "111", "aaa"];
  var lowerPw = password.toLowerCase();
  sequences.forEach(function(seq) {
    if (lowerPw.indexOf(seq) > -1) {
      warnings.push("Contains common sequence: " + seq);
    }
  });
  
  // Repeated characters
  if (/(.)\1{2,}/.test(password)) {
    warnings.push("Contains repeated characters");
  }
  
  // Estimate crack time (10 billion guesses/second)
  var combinations = Math.pow(poolSize, password.length);
  var secondsToCrack = combinations / 10000000000;
  var timeStr;
  
  if (secondsToCrack < 1) timeStr = "instant";
  else if (secondsToCrack < 60) timeStr = Math.round(secondsToCrack) + " seconds";
  else if (secondsToCrack < 3600) timeStr = Math.round(secondsToCrack / 60) + " minutes";
  else if (secondsToCrack < 86400) timeStr = Math.round(secondsToCrack / 3600) + " hours";
  else if (secondsToCrack < 31536000) timeStr = Math.round(secondsToCrack / 86400) + " days";
  else if (secondsToCrack < 31536000000) timeStr = Math.round(secondsToCrack / 31536000) + " years";
  else timeStr = "centuries";
  
  // Strength rating
  var strength;
  if (entropy < 28) strength = "Very Weak";
  else if (entropy < 36) strength = "Weak";
  else if (entropy < 60) strength = "Reasonable";
  else if (entropy < 128) strength = "Strong";
  else strength = "Very Strong";
  
  var result = [
    "Password Length: " + password.length,
    "Character Pool: " + poolSize + " characters",
    "Entropy: " + entropy.toFixed(2) + " bits",
    "Strength: " + strength,
    "Crack Time (10B/sec): " + timeStr,
    "",
    "Character Types:",
    "  Lowercase: " + (hasLower ? "Yes" : "No"),
    "  Uppercase: " + (hasUpper ? "Yes" : "No"),
    "  Digits: " + (hasDigits ? "Yes" : "No"),
    "  Symbols: " + (hasSymbols ? "Yes" : "No")
  ];
  
  if (warnings.length > 0) {
    result.push("");
    result.push("Warnings:");
    warnings.forEach(function(w) { result.push("  - " + w); });
  }
  
  state.text = result.join("\n");
  state.postInfo(strength + " - " + entropy.toFixed(0) + " bits");
}
