const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CreateProjectGlossaryMarkdown.js');

describe('CreateProjectGlossaryMarkdown', () => {
  test('shows help text', () => {
    const result = executeScript(scriptPath, 'help');
    assertContains(result.result, 'Create Project Glossary');
    assertContains(result.result, 'projectName');
    assertContains(result.result, 'includeSamples');
  });

  test('generates JSON template on empty input', () => {
    const result = executeScript(scriptPath, '');
    assertContains(result.result, 'projectName');
    assertContains(result.result, 'includeSamples');
    assertContains(result.result, 'Project Name');
  });

  test('generates glossary from JSON', () => {
    const input = '{"projectName": "My Project", "includeSamples": false}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '# My Project');
    assertContains(result.result, '## Glossary Of Terms');
    assertContains(result.result, '[A](#a)');
    assertContains(result.result, '[Z](#z)');
  });

  test('includes samples when requested', () => {
    const input = '{"projectName": "Test", "includeSamples": true}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'Example Entry');
    assertContains(result.result, '# Test');
  });
});
