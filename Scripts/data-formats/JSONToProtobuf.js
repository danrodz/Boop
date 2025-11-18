/**
  {
    "api": 1,
    "name": "JSON to Protobuf Schema",
    "description": "Generates Protocol Buffers schema from JSON",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,protobuf,proto,schema,convert"
  }
**/

function jsonToProtobuf(obj, messageName = 'MyMessage') {
  let proto = 'syntax = "proto3";\n\n';
  proto += `message ${messageName} {\n`;

  let fieldNum = 1;
  for (let key in obj) {
    const val = obj[key];
    let type = 'string';

    if (typeof val === 'boolean') type = 'bool';
    else if (typeof val === 'number') type = Number.isInteger(val) ? 'int32' : 'float';
    else if (Array.isArray(val)) type = 'repeated string';

    proto += `  ${type} ${key} = ${fieldNum};\n`;
    fieldNum++;
  }

  proto += '}';
  return proto;
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = jsonToProtobuf(json);
  } catch (error) {
    state.postError("Failed to convert to Protobuf: " + error.message);
  }
}
