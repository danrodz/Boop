/**
  {
    "api": 1,
    "name": "Query String to JSON",
    "description": "Parses URL query string to JSON object",
    "author": "Boop",
    "icon": "link",
    "tags": "query,url,json,parse,convert"
  }
**/

function queryStringToJson(qs) {
  if (qs.startsWith('?')) qs = qs.slice(1);

  const obj = {};
  const pairs = qs.split('&');

  for (let pair of pairs) {
    if (!pair) continue;
    const [key, value] = pair.split('=').map(decodeURIComponent);
    obj[key] = value || '';
  }

  return obj;
}

function main(state) {
  try {
    const json = queryStringToJson(state.text.trim());
    state.text = JSON.stringify(json, null, 2);
  } catch (error) {
    state.postError("Failed to parse query string: " + error.message);
  }
}
