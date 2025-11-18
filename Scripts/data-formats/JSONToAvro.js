/**
  {
    "api": 1,
    "name": "JSON to Avro Schema",
    "description": "Generates Apache Avro schema from JSON",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,avro,schema,convert"
  }
**/

function jsonToAvro(obj, name = 'MyRecord') {
  const schema = {
    type: 'record',
    name: name,
    fields: []
  };

  for (let key in obj) {
    const val = obj[key];
    let type = 'string';

    if (val === null) type = ['null', 'string'];
    else if (typeof val === 'boolean') type = 'boolean';
    else if (typeof val === 'number') type = Number.isInteger(val) ? 'int' : 'float';
    else if (Array.isArray(val)) type = { type: 'array', items: 'string' };

    schema.fields.push({ name: key, type: type });
  }

  return schema;
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    const avro = jsonToAvro(json);
    state.text = JSON.stringify(avro, null, 2);
  } catch (error) {
    state.postError("Failed to convert to Avro: " + error.message);
  }
}
