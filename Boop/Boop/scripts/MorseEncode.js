/**
{
	"api":1,
	"name":"Morse Encode",
	"description":"Converts text to Morse code (. and -, letters separated by space, words by /)",
	"author":"Claude",
	"icon":"wand",
	"tags":"morse,encode,telegraph"
}
**/

function main(input) {
	const morseCode = {
		'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
		'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
		'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
		'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
		'Y': '-.--', 'Z': '--..',
		'0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
		'5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
		'.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
		'/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
		';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
		'"': '.-..-.', '$': '...-..-', '@': '.--.-.'
	};

	try {
		const text = input.text.toUpperCase();
		const words = text.split(/\s+/);
		const morseWords = [];

		for (const word of words) {
			const morseLetters = [];
			for (const char of word) {
				if (morseCode[char]) {
					morseLetters.push(morseCode[char]);
				} else if (char.trim() === '') {
					continue;
				}
				// Silently skip characters not in morse code
			}
			if (morseLetters.length > 0) {
				morseWords.push(morseLetters.join(' '));
			}
		}

		input.text = morseWords.join(' / ');
	} catch (error) {
		input.postError('Failed to encode to Morse code: ' + error.message);
	}
}
