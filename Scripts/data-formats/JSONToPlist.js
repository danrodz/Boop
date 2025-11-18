/**
  {
    "api": 1,
    "name": "JSON to Plist (XML)",
    "description": "Converts JSON to Apple Property List XML format",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,plist,xml,apple,macos,ios,convert"
  }
**/

function jsonToPlist(obj) {
  function convert(val) {
    if (val === null) return '<data/>';
    if (typeof val === 'boolean') return val ? '<true/>' : '<false/>';
    if (typeof val === 'number') {
      return Number.isInteger(val) ? `<integer>${val}</integer>` : `<real>${val}</real>`;
    }
    if (typeof val === 'string') {
      const escaped = val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<string>${escaped}</string>`;
    }
    if (Array.isArray(val)) {
      let arr = '<array>\n';
      for (let item of val) {
        arr += '  ' + convert(item) + '\n';
      }
      arr += '</array>';
      return arr;
    }
    if (typeof val === 'object') {
      let dict = '<dict>\n';
      for (let key in val) {
        dict += `  <key>${key}</key>\n`;
        dict += '  ' + convert(val[key]) + '\n';
      }
      dict += '</dict>';
      return dict;
    }
    return '<data/>';
  }

  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
         '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n' +
         '<plist version="1.0">\n' +
         convert(obj) + '\n' +
         '</plist>';
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = jsonToPlist(json);
  } catch (error) {
    state.postError("Failed to convert JSON to Plist: " + error.message);
  }
}
