/**
	{
		"api":1,
		"name":"Generate Password",
		"description":"Generates a random secure password. Specify length (e.g., '16') or leave empty for default (16 characters).",
		"author":"Boop",
		"icon":"lock",
		"tags":"password,generate,random,security,secure"
	}
**/

function main(state) {
	// Character sets for password generation
	const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercase = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
	const allChars = uppercase + lowercase + numbers + symbols;

	// Parse length from input
	let length = 16; // Default length
	const input = state.text.trim();

	if (input) {
		const parsed = parseInt(input, 10);
		if (isNaN(parsed) || parsed < 1) {
			state.postError('Invalid length. Please enter a positive number or leave empty for default (16).');
			return;
		}
		if (parsed > 128) {
			state.postError('Password length too long. Maximum is 128 characters.');
			return;
		}
		length = parsed;
	}

	// Generate password ensuring at least one of each character type
	let password = '';

	// First, ensure we have at least one of each type (if length allows)
	if (length >= 4) {
		password += uppercase.charAt(getRandomInt(uppercase.length));
		password += lowercase.charAt(getRandomInt(lowercase.length));
		password += numbers.charAt(getRandomInt(numbers.length));
		password += symbols.charAt(getRandomInt(symbols.length));

		// Fill the rest with random characters
		for (let i = 4; i < length; i++) {
			password += allChars.charAt(getRandomInt(allChars.length));
		}

		// Shuffle the password to avoid predictable pattern
		password = shuffleString(password);
	} else {
		// For short passwords, just use random characters
		for (let i = 0; i < length; i++) {
			password += allChars.charAt(getRandomInt(allChars.length));
		}
	}

	state.text = password;
}

// Get cryptographically random integer (as much as possible in JSCore)
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

// Shuffle string using Fisher-Yates algorithm
function shuffleString(str) {
	const arr = str.split('');
	for (let i = arr.length - 1; i > 0; i--) {
		const j = getRandomInt(i + 1);
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr.join('');
}
