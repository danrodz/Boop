/**
  {
    "api": 1,
    "name": "Password Strength Checker",
    "description": "Check password strength and provide recommendations",
    "author": "Boop",
    "icon": "lock.shield",
    "tags": "password,strength,security,check"
  }
**/

function main(state) {
  try {
    const password = state.text;
    const length = password.length;

    let score = 0;
    const feedback = [];

    // Length check
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (length < 8) feedback.push("Password should be at least 8 characters");

    // Character variety
    if (/[a-z]/.test(password)) score++;
    else feedback.push("Add lowercase letters");

    if (/[A-Z]/.test(password)) score++;
    else feedback.push("Add uppercase letters");

    if (/[0-9]/.test(password)) score++;
    else feedback.push("Add numbers");

    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else feedback.push("Add special characters");

    // Common patterns
    if (/(.)\1{2,}/.test(password)) {
      score--;
      feedback.push("Avoid repeated characters");
    }

    if (/^[0-9]+$/.test(password)) {
      score -= 2;
      feedback.push("Don't use only numbers");
    }

    if (/^[a-zA-Z]+$/.test(password)) {
      score--;
      feedback.push("Don't use only letters");
    }

    // Common words
    const common = ['password', 'admin', '12345', 'qwerty', 'letmein'];
    if (common.some(word => password.toLowerCase().includes(word))) {
      score -= 2;
      feedback.push("Avoid common words");
    }

    // Strength rating
    let strength = 'Very Weak';
    if (score >= 7) strength = 'Very Strong';
    else if (score >= 5) strength = 'Strong';
    else if (score >= 3) strength = 'Medium';
    else if (score >= 1) strength = 'Weak';

    // Entropy calculation (approximate)
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charset += 32;

    const entropy = length * Math.log2(charset);

    const result = [
      `Strength: ${strength}`,
      `Score: ${score}/8`,
      `Entropy: ${entropy.toFixed(2)} bits`,
      ``,
      `Length: ${length} characters`,
      ``,
      feedback.length > 0 ? 'Recommendations:' : 'Great password!',
      ...feedback.map(f => `- ${f}`)
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error checking password: " + error.message);
  }
}
