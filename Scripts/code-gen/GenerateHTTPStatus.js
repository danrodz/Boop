/**
  {
    "api": 1,
    "name": "Generate HTTP Status",
    "description": "Generates HTTP status code",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) {
  const codes = [200, 201, 204, 301, 302, 400, 401, 403, 404, 500, 502, 503];
  state.insert(String(codes[Math.floor(Math.random() * codes.length)]));
}
