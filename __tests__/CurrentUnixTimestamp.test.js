const path = require('path');
const { executeScript, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CurrentUnixTimestamp.js');

describe('CurrentUnixTimestamp', () => {
  test('outputs valid timestamp in seconds', () => {
    const result = executeScript(scriptPath, '');
    const timestamp = parseInt(result.result, 10);
    assertTrue(!isNaN(timestamp), 'Timestamp should be a valid number');
    assertTrue(timestamp > 1600000000, 'Timestamp should be reasonable (after Sept 2020)');
    assertTrue(timestamp < 2000000000, 'Timestamp should be reasonable (before May 2033)');
  });

  test('generates numeric output only', () => {
    const result = executeScript(scriptPath, '');
    assertTrue(/^\d+$/.test(result.result), 'Should only contain digits');
  });

  test('output has 10 digits (seconds precision)', () => {
    const result = executeScript(scriptPath, '');
    assertTrue(result.result.length === 10, `Expected 10 digits but got ${result.result.length}`);
  });

  test('ignores input text', () => {
    const result = executeScript(scriptPath, 'Some random text');
    const timestamp = parseInt(result.result, 10);
    assertTrue(!isNaN(timestamp), 'Should ignore input and return timestamp');
    assertTrue(result.result.length === 10);
  });
});
