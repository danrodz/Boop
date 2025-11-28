const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CronExplain.js');

describe('CronExplain', () => {
  test('explains cron expression', () => {
    const result = executeScript(scriptPath, '0 0 * * *');
    assertContains(result.result.toLowerCase(), 'midnight' || result.result.includes('0'));
  });

  test('handles complex cron', () => {
    const result = executeScript(scriptPath, '*/5 * * * *');
    assertContains(result.result.toLowerCase(), 'minute' || result.result.includes('5'));
  });

  test('provides human readable output', () => {
    const result = executeScript(scriptPath, '0 12 * * 1');
    assertEqual(result.result.length > 10, true);
  });
});
