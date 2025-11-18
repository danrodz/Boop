const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const incrementPath = path.join(scriptsDir, 'IncrementNumbers.js');
const decrementPath = path.join(scriptsDir, 'DecrementNumbers.js');

describe('IncrementNumbers', () => {
  test('increments single number', () => {
    const result = executeScript(incrementPath, '42');
    assertEqual(result.result, '43');
  });

  test('increments multiple numbers', () => {
    const result = executeScript(incrementPath, 'Number 1, 2, and 3');
    assertEqual(result.result, 'Number 2, 3, and 4');
  });

  test('increments numbers in multi-line text', () => {
    const input = 'Line 1\nLine 2\nLine 3';
    const result = executeScript(incrementPath, input);
    assertEqual(result.result, 'Line 2\nLine 3\nLine 4');
  });

  test('handles zero', () => {
    const result = executeScript(incrementPath, '0');
    assertEqual(result.result, '1');
  });

  test('handles large numbers', () => {
    const result = executeScript(incrementPath, '999');
    assertEqual(result.result, '1000');
  });

  test('preserves non-numeric text', () => {
    const result = executeScript(incrementPath, 'Hello world');
    assertEqual(result.result, 'Hello world');
  });
});

describe('DecrementNumbers', () => {
  test('decrements single number', () => {
    const result = executeScript(decrementPath, '42');
    assertEqual(result.result, '41');
  });

  test('decrements multiple numbers', () => {
    const result = executeScript(decrementPath, 'Number 3, 2, and 1');
    assertEqual(result.result, 'Number 2, 1, and 0');
  });

  test('handles zero', () => {
    const result = executeScript(decrementPath, '0');
    assertEqual(result.result, '-1');
  });

  test('handles negative numbers', () => {
    const result = executeScript(decrementPath, '5');
    assertEqual(result.result, '4');
  });
});
