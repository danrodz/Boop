const path = require('path');
const { executeScript, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CurrentUnixTimestampMs.js');
const scriptPathSec = path.join(scriptsDir, 'CurrentUnixTimestamp.js');

describe('CurrentUnixTimestampMs', () => {
  test('outputs valid timestamp in milliseconds', () => {
    const result = executeScript(scriptPath, '');
    const timestamp = parseInt(result.result, 10);
    assertTrue(!isNaN(timestamp), 'Timestamp should be a valid number');
    assertTrue(timestamp > 1600000000000, 'Timestamp should be reasonable (after Sept 2020)');
    assertTrue(timestamp < 2000000000000, 'Timestamp should be reasonable (before May 2033)');
  });

  test('generates numeric output only', () => {
    const result = executeScript(scriptPath, '');
    assertTrue(/^\d+$/.test(result.result), 'Should only contain digits');
  });

  test('output has 13 digits (milliseconds precision)', () => {
    const result = executeScript(scriptPath, '');
    assertTrue(result.result.length === 13, `Expected 13 digits but got ${result.result.length}`);
  });

  test('ignores input text', () => {
    const result = executeScript(scriptPath, 'Some random text');
    const timestamp = parseInt(result.result, 10);
    assertTrue(!isNaN(timestamp), 'Should ignore input and return timestamp');
    assertTrue(result.result.length === 13);
  });

  test('is approximately 1000x CurrentUnixTimestamp', () => {
    const resultSec = executeScript(scriptPathSec, '');
    const resultMs = executeScript(scriptPath, '');
    const timestampSec = parseInt(resultSec.result, 10);
    const timestampMs = parseInt(resultMs.result, 10);
    const ratio = timestampMs / timestampSec;
    assertTrue(ratio > 999 && ratio < 1001, `Ratio should be ~1000 but got ${ratio}`);
  });

  test('both timestamp scripts generate current time', () => {
    const before = Date.now();
    const resultSec = executeScript(scriptPathSec, '');
    const resultMs = executeScript(scriptPath, '');
    const after = Date.now();

    const timestampSec = parseInt(resultSec.result, 10) * 1000; // Convert to ms
    const timestampMs = parseInt(resultMs.result, 10);

    assertTrue(timestampSec >= before - 1000 && timestampSec <= after + 1000, 'Second timestamp should be current');
    assertTrue(timestampMs >= before && timestampMs <= after + 1000, 'Millisecond timestamp should be current');
  });
});
