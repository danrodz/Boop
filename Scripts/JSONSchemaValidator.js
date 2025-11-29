/**
  {
    "api": 1,
    "name": "Validate JSON Schema",
    "description": "Validate JSON against a schema (basic validation)",
    "author": "Boop",
    "icon": "checkmark.shield",
    "tags": "json,schema,validate,check"
  }
**/

function main(state) {
  try {
    // Expected format: schema and data separated by "---"
    const parts = state.text.split('---');

    if (parts.length !== 2) {
      state.postError("Format: <schema>\\n---\\n<data>");
      return;
    }

    const schema = JSON.parse(parts[0].trim());
    const data = JSON.parse(parts[1].trim());

    function validate(schema, data, path = 'root') {
      const errors = [];

      // Type validation
      if (schema.type) {
        const actualType = Array.isArray(data) ? 'array' : typeof data;
        if (schema.type !== actualType) {
          errors.push(`${path}: expected ${schema.type}, got ${actualType}`);
        }
      }

      // Required properties
      if (schema.required && schema.type === 'object') {
        for (let prop of schema.required) {
          if (!(prop in data)) {
            errors.push(`${path}: missing required property "${prop}"`);
          }
        }
      }

      // Properties validation
      if (schema.properties && typeof data === 'object' && !Array.isArray(data)) {
        for (let [key, propSchema] of Object.entries(schema.properties)) {
          if (key in data) {
            errors.push(...validate(propSchema, data[key], `${path}.${key}`));
          }
        }
      }

      // Array items validation
      if (schema.items && Array.isArray(data)) {
        data.forEach((item, i) => {
          errors.push(...validate(schema.items, item, `${path}[${i}]`));
        });
      }

      return errors;
    }

    const errors = validate(schema, data);

    if (errors.length === 0) {
      state.text = '✓ Valid - No errors found';
    } else {
      state.text = 'Validation errors:\n' + errors.join('\n');
    }
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}
