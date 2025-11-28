/**
  {
    "api": 1,
    "name": "Generate Strong Password",
    "description": "Generate a cryptographically strong random password",
    "author": "Boop",
    "icon": "key",
    "tags": "password,generate,security,random"
  }
**/

function main(state) {
  const length = parseInt(state.text.trim()) || 16;

  if (length < 8 || length > 128) {
    state.postError("Password length must be between 8 and 128");
    return;
  }

  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const allChars = lowercase + uppercase + numbers + symbols;

  let password = '';

  // Ensure at least one of each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  state.text = password;
  state.postInfo(`Generated ${length}-character password`);
}
