/**
  {
    "api":1,
    "name":"Flatten JSON",
    "description":"Flatten nested JSON to dot notation",
    "author":"Boop",
    "icon":"indent",
    "tags":"json,flatten,dot notation"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const flattened = flatten(obj);
    state.text = JSON.stringify(flattened, null, 2);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}

function flatten(obj, prefix = '', result = {}) {
  if (obj === null || obj === undefined) {
    if (prefix) {
      result[prefix] = obj;
    }
    return result;
  }

  if (typeof obj !== 'object') {
    result[prefix] = obj;
    return result;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      result[prefix] = [];
    } else {
      obj.forEach((item, index) => {
        const key = prefix ? `${prefix}.${index}` : String(index);
        flatten(item, key, result);
      });
    }
  } else {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      result[prefix] = {};
    } else {
      keys.forEach(key => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        flatten(obj[key], newKey, result);
      });
    }
  }

  return result;
}
