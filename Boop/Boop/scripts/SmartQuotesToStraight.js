/**
{
  "api": 1,
  "name": "Smart Quotes to Straight",
  "description": "Converts smart/curly quotes to straight quotes.",
  "author": "Boop",
  "icon": "quotes",
  "tags": "smart,quotes,curly,straight,convert"
}
**/

function main(input) {
  try {
    const original = input.text;

    // Replace smart single quotes (left and right) with straight single quote
    // U+2018 (') and U+2019 (') -> '
    input.text = input.text.replace(/[\u2018\u2019]/g, "'");

    // Replace smart double quotes (left and right) with straight double quote
    // U+201C (") and U+201D (") -> "
    input.text = input.text.replace(/[\u201C\u201D]/g, '"');

    // Also handle prime marks that are sometimes used as quotes
    // U+2032 (′) and U+2033 (″)
    input.text = input.text.replace(/\u2032/g, "'");
    input.text = input.text.replace(/\u2033/g, '"');

    if (input.text === original) {
      input.postInfo('No smart quotes found');
    } else {
      input.postInfo('Converted smart quotes to straight quotes');
    }
  } catch (error) {
    input.postError(`Error: ${error.message}`);
  }
}
