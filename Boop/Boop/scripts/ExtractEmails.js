/**
	{
		"api":1,
		"name":"Extract Emails",
		"description":"Extracts all email addresses from text and lists them one per line.",
		"author":"Claude",
		"icon":"envelope",
		"tags":"email,extract,parse,contact"
	}
**/

function main(input) {
	try {
		// RFC 5322 compliant email regex (simplified but robust)
		const emailPattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;

		const text = input.text;
		const matches = text.match(emailPattern);

		if (matches && matches.length > 0) {
			// Remove duplicates and sort
			const uniqueEmails = [...new Set(matches)];
			input.text = uniqueEmails.join('\n');
		} else {
			input.text = '';
			input.postInfo('No email addresses found in the text.');
		}

	} catch (error) {
		input.postError("Error extracting emails: " + error.message);
	}
}
