const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ListToHTMLList.js');

describe('ListToHTMLList', () => {
  test('converts comma list to HTML', () => {
    const result = executeScript(scriptPath, 'item1,item2,item3');
    assertContains(result.result, '<ul>');
    assertContains(result.result, '<li>');
    assertContains(result.result, 'item1');
  });

  test('converts HTML back to comma list', () => {
    const result = executeScript(scriptPath, '<ul><li>item1</li><li>item2</li></ul>');
    assertContains(result.result, 'item1');
    assertContains(result.result, ',');
  });
});
