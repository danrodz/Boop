/**
  {
    "api": 1,
    "name": "Password Strength Checker",
    "description": "Check password strength and provide feedback",
    "author": "Boop",
    "icon": "key",
    "tags": "password,security,strength,check"
  }
**/

function main(state) {
  const password = state.text;
  let score = 0;
  const feedback = [];

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  else feedback.push("- Use at least 16 characters");

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("- Add lowercase letters");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("- Add uppercase letters");

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("- Add numbers");

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push("- Add special characters");

  // Common patterns
  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push("- Avoid repeated characters");
  }

  if (/^[0-9]+$/.test(password)) {
    score -= 2;
    feedback.push("- Don't use only numbers");
  }

  // Strength rating
  let strength = 'Very Weak';
  if (score >= 7) strength = 'Very Strong';
  else if (score >= 6) strength = 'Strong';
  else if (score >= 4) strength = 'Medium';
  else if (score >= 2) strength = 'Weak';

  let result = `Password Strength: ${strength}\nScore: ${Math.max(0, score)}/8\n\n`;

  if (feedback.length > 0) {
    result += "Suggestions:\n" + feedback.join('\n');
  } else {
    result += "Excellent password! ✓";
  }

  state.text = result;
}
