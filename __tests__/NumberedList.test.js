const path = require('path');
const { executeScript, assertEqual, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const numberedPath = path.join(scriptsDir, 'NumberedList.js');
const bulletPath = path.join(scriptsDir, 'BulletList.js');
const checkboxPath = path.join(scriptsDir, 'CheckboxList.js');

describe('NumberedList', () => {
  test('creates numbered list', () => {
    const input = 'First item\nSecond item\nThird item';
    const result = executeScript(numberedPath, input);
    assertEqual(result.result, '1. First item\n2. Second item\n3. Third item');
  });

  test('handles single line', () => {
    const result = executeScript(numberedPath, 'Single');
    assertEqual(result.result, '1. Single');
  });
});

describe('BulletList', () => {
  test('creates bullet list', () => {
    const input = 'Item 1\nItem 2\nItem 3';
    const result = executeScript(bulletPath, input);
    assertEqual(result.result, '- Item 1\n- Item 2\n- Item 3');
  });
});

describe('CheckboxList', () => {
  test('creates checkbox list', () => {
    const input = 'Task 1\nTask 2\nTask 3';
    const result = executeScript(checkboxPath, input);
    assertContains(result.result, '- [ ] Task 1');
    assertContains(result.result, '- [ ] Task 2');
    assertContains(result.result, '- [ ] Task 3');
  });
});
