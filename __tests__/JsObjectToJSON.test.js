const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JsObjectToJSON.js');

describe('JsObjectToJSON', () => {
  test('converts JS object to JSON', () => {
    const result = executeScript(scriptPath, "{name: 'John', age: 30}");
    assertContains(result.result, '"name"');
    assertContains(result.result, '"John"');
  });
});
