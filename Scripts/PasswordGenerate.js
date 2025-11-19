/**
  {
    "api": 1,
    "name": "Password Generator",
    "description": "Generates cryptographically secure random password",
    "author": "Boop",
    "icon": "key.fill",
    "tags": "password,generate,random,secure,crypto"
  }
**/

function main(state) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const allChars = lowercase + uppercase + numbers + symbols;

  // Parse length from input, default to 20
  const input = state.text.trim();
  const length = input && !isNaN(input) ? Math.min(Math.max(parseInt(input), 8), 128) : 20;

  // Use crypto.getRandomValues for cryptographically secure randomness
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  let password = '';

  // Ensure at least one of each required character type
  const getRandomChar = (chars) => {
    const randomIndex = crypto.getRandomValues(new Uint8Array(1))[0] % chars.length;
    return chars[randomIndex];
  };

  password += getRandomChar(lowercase);
  password += getRandomChar(uppercase);
  password += getRandomChar(numbers);
  password += getRandomChar(symbols);

  // Fill the rest
  for (let i = 4; i < length; i++) {
    const randomIndex = array[i] % allChars.length;
    password += allChars[randomIndex];
  }

  // Shuffle the password
  const passwordArray = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint8Array(1))[0] % (i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  state.insert(passwordArray.join(''));
}
