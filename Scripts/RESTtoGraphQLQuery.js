/**
  {
    "api": 1,
    "name": "REST to GraphQL Query",
    "description": "Convert REST endpoint to GraphQL query template",
    "author": "Boop",
    "icon": "code",
    "tags": "rest,graphql,api,convert,query"
  }
**/

function main(state) {
  const url = state.text.trim();

  // Extract path segments
  const match = url.match(/\/([^/?]+)(?:\/([^/?]+))?/);
  if (!match) {
    state.postError("Could not parse URL");
    return;
  }

  const resource = match[1];
  const id = match[2];

  let query;
  if (id) {
    // Single resource
    query = `query Get${resource.charAt(0).toUpperCase() + resource.slice(1,-1)} {
  ${resource.slice(0, -1)}(id: "${id}") {
    id
    # Add fields here
  }
}`;
  } else {
    // List of resources
    query = `query Get${resource.charAt(0).toUpperCase() + resource.slice(1)} {
  ${resource} {
    id
    # Add fields here
  }
}`;
  }

  state.text = query;
  state.postInfo("Generated GraphQL query template");
}
