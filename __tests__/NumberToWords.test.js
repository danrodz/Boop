const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NumberToWords.js');

describe('NumberToWords', () => {
  test('converts single digit to words', () => {
    const result = executeScript(scriptPath, '5');
    assertContains(result.result.toLowerCase(), 'five');
  });

  test('converts teen number to words', () => {
    const result = executeScript(scriptPath, '15');
    assertContains(result.result.toLowerCase(), 'fifteen');
  });

  test('converts tens to words', () => {
    const result = executeScript(scriptPath, '42');
    assertContains(result.result.toLowerCase(), 'forty');
  });

  test('converts zero to words', () => {
    const result = executeScript(scriptPath, '0');
    assertContains(result.result.toLowerCase(), 'zero');
  });
});
