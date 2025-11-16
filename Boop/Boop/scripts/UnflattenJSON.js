/**
  {
    "api":1,
    "name":"Unflatten JSON",
    "description":"Unflatten dot notation to nested JSON",
    "author":"Boop",
    "icon":"outdent",
    "tags":"json,unflatten,dot notation"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const unflattened = unflatten(obj);
    state.text = JSON.stringify(unflattened, null, 2);
  } catch (error) {
    state.postError("Invalid JSON");
  }
}

function unflatten(obj) {
  const result = {};

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const part = keys[i];
      const isLast = i === keys.length - 1;

      if (isLast) {
        current[part] = obj[key];
      } else {
        const nextPart = keys[i + 1];
        const isNextArray = /^\d+$/.test(nextPart);

        if (!current[part]) {
          current[part] = isNextArray ? [] : {};
        }

        current = current[part];
      }
    }
  }

  return result;
}
