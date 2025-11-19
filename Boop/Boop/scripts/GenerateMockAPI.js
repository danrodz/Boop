/**
  {
    "api": 1,
    "name": "Generate Mock API",
    "description": "Generate mock API response from TypeScript interface",
    "author": "Boop",
    "icon": "doc.text.below.ecg",
    "tags": "mock,api,json,typescript,test"
  }
**/

function main(state) {
  try {
    const input = state.text;

    // Parse interface
    const interfaceMatch = input.match(/interface\s+(\w+)\s*{([^}]+)}/);
    if (!interfaceMatch) {
      state.postError("Could not find TypeScript interface");
      return;
    }

    const fields = interfaceMatch[2].trim().split('\n');
    const mockData = {};

    for (const field of fields) {
      const fieldMatch = field.trim().match(/(\w+)(\?)?:\s*([^;]+);?/);
      if (!fieldMatch) continue;

      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[3].replace(/\s*\|\s*null/, '').trim();

      // Generate mock value based on type
      if (fieldType === 'string') {
        mockData[fieldName] = fieldName.includes('email') ? 'user@example.com' :
                              fieldName.includes('name') ? 'John Doe' :
                              fieldName.includes('id') ? 'abc123' :
                              'sample text';
      } else if (fieldType === 'number') {
        mockData[fieldName] = fieldName.includes('id') ? 1 :
                              fieldName.includes('age') ? 25 :
                              fieldName.includes('price') ? 99.99 :
                              42;
      } else if (fieldType === 'boolean') {
        mockData[fieldName] = true;
      } else if (fieldType === 'Date') {
        mockData[fieldName] = new Date().toISOString();
      } else if (fieldType.endsWith('[]')) {
        mockData[fieldName] = [];
      } else {
        mockData[fieldName] = null;
      }
    }

    state.text = JSON.stringify(mockData, null, 2);
  } catch (error) {
    state.postError("Error generating mock API: " + error.message);
  }
}
