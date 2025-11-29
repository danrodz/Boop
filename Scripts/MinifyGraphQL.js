/**
  {
    "api": 1,
    "name": "Minify GraphQL",
    "description": "Remove whitespace and comments from GraphQL",
    "author": "Boop",
    "icon": "arrow.down.right.and.arrow.up.left",
    "tags": "graphql,minify,compress,gql"
  }
**/

function main(state) {
  try {
    let gql = state.text;

    // Remove comments
    gql = gql.replace(/#.*$/gm, '');

    // Remove unnecessary whitespace
    gql = gql.replace(/\s+/g, ' ');

    // Remove whitespace around punctuation
    gql = gql.replace(/\s*([{}(),:])\s*/g, '$1');

    state.text = gql.trim();
  } catch (error) {
    state.postError("Failed to minify GraphQL: " + error.message);
  }
}
