/**
	{
		"api":1,
		"name":"Extract URLs",
		"description":"Extracts all URLs from text and lists them one per line.",
		"author":"danrodz",
		"icon":"link",
		"tags":"url,extract,links,parse"
	}
**/

function main(input) {
	try {
		// Comprehensive URL regex pattern
		// Matches http://, https://, ftp://, and www. URLs
		const urlPattern = /(?:(?:https?|ftp):\/\/|www\.)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?/gi;

		const text = input.text;
		const matches = text.match(urlPattern);

		if (matches && matches.length > 0) {
			// Remove duplicates and sort
			const uniqueUrls = [...new Set(matches)];
			input.text = uniqueUrls.join('\n');
		} else {
			input.text = '';
			input.postInfo('No URLs found in the text.');
		}

	} catch (error) {
		input.postError("Error extracting URLs: " + error.message);
	}
}
