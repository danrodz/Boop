/**
	{
		"api":1,
		"name":"Generate Lorem Ipsum (Advanced)",
		"description":"Generates Lorem Ipsum with customizable paragraphs, words, and format options",
		"author":"Boop",
		"icon":"text",
		"tags":"lorem,ipsum,placeholder,generate,text"
	}
**/

function main(state) {
	const loremWords = [
		'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
		'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
		'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
		'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
		'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
		'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
		'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
		'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
	];

	const generateSentence = () => {
		const length = 8 + Math.floor(Math.random() * 12);
		const words = [];
		for (let i = 0; i < length; i++) {
			words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
		}
		return words.join(' ') + '.';
	};

	const generateParagraph = () => {
		const sentences = 3 + Math.floor(Math.random() * 4);
		const text = [];
		for (let i = 0; i < sentences; i++) {
			const sentence = generateSentence();
			text.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
		}
		return text.join(' ');
	};

	// Generate different amounts
	const para1 = generateParagraph();
	const para3 = [para1, generateParagraph(), generateParagraph()].join('\n\n');
	const para5 = [para3, generateParagraph(), generateParagraph()].join('\n\n');

	const result = `Lorem Ipsum Generated:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1 Paragraph:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${para1}

3 Paragraphs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${para3}

5 Paragraphs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${para5}

Choose the amount you need and paste it where needed.`;

	state.text = result;
}
