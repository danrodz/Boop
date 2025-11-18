/**
  {
    "api": 1,
    "name": "XML to JSON (Simple)",
    "description": "Converts simple XML to JSON format",
    "author": "Boop",
    "icon": "arrow.left",
    "tags": "xml,json,convert,transform"
  }
**/

function xmlToJson(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');

  function nodeToObj(node) {
    if (node.nodeType === 3) return node.nodeValue.trim();

    let obj = {};
    if (node.attributes && node.attributes.length > 0) {
      obj['@attributes'] = {};
      for (let attr of node.attributes) {
        obj['@attributes'][attr.name] = attr.value;
      }
    }

    if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
      obj['#text'] = node.childNodes[0].nodeValue;
    } else {
      for (let child of node.childNodes) {
        if (child.nodeType !== 1) continue;
        const name = child.nodeName;
        const value = nodeToObj(child);

        if (obj[name]) {
          if (!Array.isArray(obj[name])) obj[name] = [obj[name]];
          obj[name].push(value);
        } else {
          obj[name] = value;
        }
      }
    }

    return obj;
  }

  return nodeToObj(doc.documentElement);
}

function main(state) {
  try {
    const json = xmlToJson(state.text);
    state.text = JSON.stringify(json, null, 2);
  } catch (error) {
    state.postError("Failed to convert XML to JSON: " + error.message);
  }
}
