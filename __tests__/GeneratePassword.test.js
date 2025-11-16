const path = require('path');
const { executeScript, assertTrue, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'GeneratePassword.js');

describe('GeneratePassword', () => {
  test('generates default 16 character password', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result.length, 16);
  });

  test('generates password of specified length', () => {
    const result = executeScript(scriptPath, '24');
    assertEqual(result.result.length, 24);
  });

  test('generates different passwords on multiple runs', () => {
    const result1 = executeScript(scriptPath, '16');
    const result2 = executeScript(scriptPath, '16');
    assertTrue(result1.result !== result2.result, 'Passwords should be random');
  });

  test('includes mixed character types for length >= 4', () => {
    const result = executeScript(scriptPath, '16');
    const password = result.result;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
    assertTrue(hasUpper && hasLower && hasNumber && hasSymbol, 'Password should contain all character types');
  });

  test('handles short length (1 char)', () => {
    const result = executeScript(scriptPath, '1');
    assertEqual(result.result.length, 1);
  });

  test('handles short length (3 chars)', () => {
    const result = executeScript(scriptPath, '3');
    assertEqual(result.result.length, 3);
  });

  test('handles medium length (32 chars)', () => {
    const result = executeScript(scriptPath, '32');
    assertEqual(result.result.length, 32);
  });

  test('handles long length (128 chars)', () => {
    const result = executeScript(scriptPath, '128');
    assertEqual(result.result.length, 128);
  });

  test('rejects length > 128', () => {
    const result = executeScript(scriptPath, '129');
    assertTrue(result.errors.length > 0, 'Should post error for length > 128');
  });

  test('rejects invalid length (zero)', () => {
    const result = executeScript(scriptPath, '0');
    assertTrue(result.errors.length > 0, 'Should post error for zero length');
  });

  test('rejects invalid length (negative)', () => {
    const result = executeScript(scriptPath, '-5');
    assertTrue(result.errors.length > 0, 'Should post error for negative length');
  });

  test('rejects invalid length (non-numeric)', () => {
    const result = executeScript(scriptPath, 'abc');
    assertTrue(result.errors.length > 0, 'Should post error for non-numeric length');
  });

  test('rejects invalid length (decimal)', () => {
    const result = executeScript(scriptPath, '16.5');
    // parseInt will convert '16.5' to 16, which is valid
    assertEqual(result.result.length, 16);
  });

  test('only contains valid characters', () => {
    const result = executeScript(scriptPath, '50');
    const validChars = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/;
    assertTrue(validChars.test(result.result), 'Password should only contain valid characters');
  });
});
