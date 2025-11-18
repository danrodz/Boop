/**
  {
    "api": 1,
    "name": "Password Strength Checker",
    "description": "Analyze password strength and provide recommendations",
    "author": "Boop",
    "icon": "lock.shield",
    "tags": "password,strength,security,check"
  }
**/

function main(state) {
  try {
    const password = state.text;
    let score = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) {
      score += 20;
    } else {
      feedback.push('❌ Use at least 8 characters');
    }

    if (password.length >= 12) {
      score += 10;
    }

    if (password.length >= 16) {
      score += 10;
    }

    // Character variety
    if (/[a-z]/.test(password)) {
      score += 15;
    } else {
      feedback.push('❌ Add lowercase letters');
    }

    if (/[A-Z]/.test(password)) {
      score += 15;
    } else {
      feedback.push('❌ Add uppercase letters');
    }

    if (/[0-9]/.test(password)) {
      score += 15;
    } else {
      feedback.push('❌ Add numbers');
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 15;
    } else {
      feedback.push('❌ Add special characters');
    }

    // Common patterns penalty
    if (/^[a-z]+$/.test(password) || /^[A-Z]+$/.test(password)) {
      score -= 10;
      feedback.push('⚠️  Avoid using only letters');
    }

    if (/^[0-9]+$/.test(password)) {
      score -= 20;
      feedback.push('⚠️  Never use only numbers');
    }

    if (/(.)\1{2,}/.test(password)) {
      score -= 10;
      feedback.push('⚠️  Avoid repeating characters');
    }

    // Common passwords
    const common = ['password', '123456', 'qwerty', 'admin', 'letmein'];
    if (common.includes(password.toLowerCase())) {
      score = 0;
      feedback.push('🚫 This is a common password!');
    }

    // Score interpretation
    let strength;
    let color;
    if (score >= 80) {
      strength = 'Very Strong';
      color = '🟢';
    } else if (score >= 60) {
      strength = 'Strong';
      color = '🔵';
    } else if (score >= 40) {
      strength = 'Moderate';
      color = '🟡';
    } else if (score >= 20) {
      strength = 'Weak';
      color = '🟠';
    } else {
      strength = 'Very Weak';
      color = '🔴';
    }

    let result = `${color} Strength: ${strength} (${score}/100)\n\n`;
    result += `Length: ${password.length} characters\n`;

    if (feedback.length > 0) {
      result += '\nRecommendations:\n';
      result += feedback.join('\n');
    } else {
      result += '\n✓ Excellent password!';
    }

    state.text = result;
  } catch (error) {
    state.postError("Failed to check password: " + error.message);
  }
}
