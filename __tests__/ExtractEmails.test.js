const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ExtractEmails.js');

describe('ExtractEmails', () => {
  test('extracts email from text', () => {
    const result = executeScript(scriptPath, 'Contact us at test@example.com for more info');
    assertContains(result.result, 'test@example.com');
  });

  test('extracts multiple emails', () => {
    const result = executeScript(scriptPath, 'Email: a@test.com or b@test.com');
    assertContains(result.result, 'a@test.com');
    assertContains(result.result, 'b@test.com');
  });

  test('handles no emails', () => {
    const result = executeScript(scriptPath, 'No emails here');
    assertEqual(result.result, '' || result.result === 'No emails here');
  });
});
