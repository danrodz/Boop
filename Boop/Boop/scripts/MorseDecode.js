/**
{
	"api":1,
	"name":"Morse Decode",
	"description":"Converts Morse code to text (. and -, letters separated by space, words by /)",
	"author":"danrodz",
	"icon":"wand",
	"tags":"morse,decode,telegraph"
}
**/

function main(input) {
	const morseToChar = {
		'.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
		'--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
		'--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
		'...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
		'-.--': 'Y', '--..': 'Z',
		'-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
		'.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
		'.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': "'", '-.-.--': '!',
		'-..-.': '/', '-.--.': '(', '-.--.-': ')', '.-...': '&', '---...': ':',
		'-.-.-.': ';', '-...-': '=', '.-.-.': '+', '-....-': '-', '..--.-': '_',
		'.-..-.': '"', '...-..-': '$', '.--.-.': '@'
	};

	try {
		const morseText = input.text.trim();
		const words = morseText.split(/\s*\/\s*/);
		const decodedWords = [];

		for (const word of words) {
			const letters = word.trim().split(/\s+/);
			const decodedLetters = [];

			for (const morse of letters) {
				if (morse === '') continue;
				if (morseToChar[morse]) {
					decodedLetters.push(morseToChar[morse]);
				} else {
					// Unknown morse code, skip it
					decodedLetters.push('?');
				}
			}

			if (decodedLetters.length > 0) {
				decodedWords.push(decodedLetters.join(''));
			}
		}

		input.text = decodedWords.join(' ');
	} catch (error) {
		input.postError('Failed to decode Morse code: ' + error.message);
	}
}
