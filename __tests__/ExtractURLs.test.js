const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ExtractURLs.js');

describe('ExtractURLs', () => {
  test('extracts URL from text', () => {
    const result = executeScript(scriptPath, 'Visit https://example.com for more');
    assertContains(result.result, 'https://example.com');
  });

  test('extracts multiple URLs', () => {
    const result = executeScript(scriptPath, 'Check https://test.com and http://example.org');
    assertContains(result.result, 'https://test.com');
    assertContains(result.result, 'http://example.org');
  });

  test('handles no URLs', () => {
    const result = executeScript(scriptPath, 'No URLs here');
    assertEqual(result.result === '' || result.result === 'No URLs here', true);
  });
});
