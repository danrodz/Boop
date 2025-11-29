/**
  {
    "api": 1,
    "name": "URL Query String Parse",
    "description": "Parses URL query string to formatted JSON",
    "author": "Boop",
    "icon": "link.circle.fill",
    "tags": "url,query,parse,params,json"
  }
**/

function main(state) {
  try {
    let query = state.text.trim();

    // Remove leading ? if present
    if (query.startsWith('?')) {
      query = query.substring(1);
    }

    // Handle full URLs
    if (query.includes('://')) {
      const url = new URL(query);
      query = url.search.substring(1);
    }

    const params = {};
    const pairs = query.split('&');

    for (const pair of pairs) {
      if (!pair) continue;

      const [key, value] = pair.split('=').map(decodeURIComponent);

      // Handle multiple values for same key
      if (params[key]) {
        if (Array.isArray(params[key])) {
          params[key].push(value || '');
        } else {
          params[key] = [params[key], value || ''];
        }
      } else {
        params[key] = value || '';
      }
    }

    state.text = JSON.stringify(params, null, 2);
  } catch (error) {
    state.postError("Failed to parse query string: " + error.message);
  }
}
