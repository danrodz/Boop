/**
{
  "api": 1,
  "name": "Straight Quotes to Smart",
  "description": "Converts straight quotes to smart/curly quotes.",
  "author": "Boop",
  "icon": "quotes",
  "tags": "smart,quotes,curly,straight,convert"
}
**/

function main(input) {
  try {
    const original = input.text;
    let text = input.text;

    // Convert double quotes to smart quotes
    // Opening quote: after whitespace, start of line, or opening bracket
    // Closing quote: before whitespace, end of line, punctuation, or closing bracket
    text = text.replace(/"(?=\w)/g, '\u201C'); // Opening double quote before word character
    text = text.replace(/(\s|^)"(?=\S)/g, '$1\u201C'); // Opening double quote after space or start
    text = text.replace(/"/g, '\u201D'); // All remaining double quotes are closing

    // Convert single quotes to smart quotes
    // Be careful with contractions (don't, it's, etc.)
    text = text.replace(/(\s|^)'(?=\w)/g, '$1\u2018'); // Opening single quote
    text = text.replace(/(\w)'(?=\w)/g, '$1\u2019'); // Apostrophe in contractions
    text = text.replace(/'(?=\s|$|[.,!?;:])/g, '\u2019'); // Closing single quote
    text = text.replace(/'/g, '\u2019'); // All remaining single quotes

    input.text = text;

    if (input.text === original) {
      input.postInfo('No straight quotes found');
    } else {
      input.postInfo('Converted straight quotes to smart quotes');
    }
  } catch (error) {
    input.postError(`Error: ${error.message}`);
  }
}
