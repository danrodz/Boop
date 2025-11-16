/**
  {
    "api":1,
    "name":"Sort JSON Keys Deep",
    "description":"Alphabetically sort all keys recursively in JSON",
    "author":"danrodz",
    "icon":"sort-characters",
    "tags":"json,sort,keys,deep,recursive"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const sorted = sortKeysDeep(obj);
    state.text = JSON.stringify(sorted, null, 2);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}

function sortKeysDeep(obj) {
  // Handle null and undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle primitives
  if (typeof obj !== 'object') {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => sortKeysDeep(item));
  }

  // Handle objects
  const result = {};
  const keys = Object.keys(obj).sort();

  keys.forEach(key => {
    result[key] = sortKeysDeep(obj[key]);
  });

  return result;
}
