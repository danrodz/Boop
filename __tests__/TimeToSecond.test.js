const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'TimeToSecond.js');

describe('TimeToSecond', () => {
  test('converts hh:mm:ss to seconds', () => {
    const result = executeScript(scriptPath, '1:30:45');
    assertContains(result.result, '5445'); // 1*3600 + 30*60 + 45
  });

  test('handles mm:ss format (treated as hh:mm)', () => {
    // Note: Script treats "2:30" as hh:mm:ss so 2:30 = 2 hours, 30 minutes = 9000 seconds
    // This is a limitation of the script design - it always expects hh:mm:ss format
    const result = executeScript(scriptPath, '2:30');
    assertContains(result.result, '9000'); // 2*3600 + 30*60
  });
});
