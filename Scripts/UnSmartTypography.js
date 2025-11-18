/**
  {
    "api": 1,
    "name": "Un-Smart Typography",
    "description": "Convert smart quotes, em dashes, etc. to plain ASCII",
    "author": "Boop",
    "icon": "quote.bubble",
    "tags": "typography,quotes,dashes,plain,ascii"
  }
**/

function main(state) {
  try {
    let text = state.text;

    // Em dash and en dash
    text = text.replace(/—/g, '--');
    text = text.replace(/–/g, '-');

    // Curly quotes
    text = text.replace(/[""]/g, '"');
    text = text.replace(/['']/g, "'");

    // Ellipsis
    text = text.replace(/…/g, '...');

    // Multiplication sign
    text = text.replace(/×/g, 'x');

    // Copyright, trademark, registered
    text = text.replace(/©/g, '(c)');
    text = text.replace(/®/g, '(R)');
    text = text.replace(/™/g, '(TM)');

    // Degree symbol
    text = text.replace(/°/g, ' degrees');

    // Fractions
    text = text.replace(/½/g, '1/2');
    text = text.replace(/¼/g, '1/4');
    text = text.replace(/¾/g, '3/4');

    state.text = text;
  } catch (error) {
    state.postError("Failed to convert typography: " + error.message);
  }
}
