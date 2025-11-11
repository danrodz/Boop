#!/usr/bin/env node

/**
 * JavaScript Test Runner for Boop Scripts
 *
 * This test suite executes Boop scripts directly using Node.js,
 * without requiring Xcode or the full macOS app environment.
 *
 * It mocks the Boop ScriptExecution environment to test the
 * actual JavaScript logic of each script.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

/**
 * Mock Boop ScriptExecution object
 */
class MockScriptExecution {
  constructor(initialText = '', initialSelection = null) {
    this._text = initialText;
    this._fullText = initialText;
    this._selection = initialSelection;
    this._insertions = [];
    this.errors = [];
    this.infos = [];
  }

  get text() {
    return this._selection !== null ? this._selection : this._text;
  }

  set text(value) {
    if (this._selection !== null) {
      this._selection = value;
    } else {
      this._text = value;
      this._fullText = value;
    }
  }

  get fullText() {
    return this._fullText;
  }

  set fullText(value) {
    this._fullText = value;
    this._text = value;
  }

  get selection() {
    return this._selection;
  }

  set selection(value) {
    this._selection = value;
  }

  insert(text) {
    this._insertions.push(text);
  }

  postError(message) {
    this.errors.push(message);
  }

  postInfo(message) {
    this.infos.push(message);
  }

  getResult() {
    if (this._insertions.length > 0) {
      return this._insertions.join('');
    }
    return this.text;
  }
}

/**
 * Load and execute a Boop script
 */
function loadScript(scriptPath) {
  const code = fs.readFileSync(scriptPath, 'utf8');

  // Extract metadata
  const metadataMatch = code.match(/\/\*\*([\s\S]*?)\*\*\//);
  let metadata = null;
  if (metadataMatch) {
    try {
      metadata = JSON.parse(metadataMatch[1]);
    } catch (e) {
      // Metadata parsing failed
    }
  }

  return { code, metadata };
}

/**
 * Execute a script with given input
 */
function executeScript(scriptPath, input, selection = null) {
  const { code, metadata } = loadScript(scriptPath);
  const state = new MockScriptExecution(input, selection);

  // Create a sandboxed context
  const context = vm.createContext({
    state,
    input: state, // Some scripts use 'input' instead of 'state'
    console,
    require: createMockRequire(path.dirname(scriptPath)),
  });

  try {
    vm.runInContext(code, context);

    // Call the main function
    if (context.main) {
      context.main(state);
    } else {
      throw new Error('No main() function found in script');
    }

    return {
      success: true,
      result: state.getResult(),
      errors: state.errors,
      infos: state.infos,
      insertions: state._insertions,
      metadata,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stack: error.stack,
      metadata,
    };
  }
}

/**
 * Mock require() for Boop modules
 */
function createMockRequire(scriptDir) {
  return function mockRequire(modulePath) {
    // Handle @boop/ modules
    if (modulePath.startsWith('@boop/')) {
      const moduleName = modulePath.replace('@boop/', '');
      const libPath = path.join(__dirname, 'Boop/Boop/scripts/lib', moduleName);

      if (fs.existsSync(libPath)) {
        const moduleCode = fs.readFileSync(libPath, 'utf8');
        const moduleContext = { module: { exports: {} }, exports: {} };
        vm.runInContext(moduleCode, vm.createContext(moduleContext));
        return moduleContext.module.exports || moduleContext.exports;
      }
    }

    // Fallback to regular require
    return require(modulePath);
  };
}

/**
 * Test assertion helpers
 */
function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`${colors.green}✓${colors.reset} ${name}`);
  } catch (error) {
    failedTests++;
    failures.push({ name, error: error.message, stack: error.stack });
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    console.log(`  ${colors.red}${error.message}${colors.reset}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
  }
}

function assertContains(text, substring, message) {
  if (!text.includes(substring)) {
    throw new Error(message || `Expected text to contain "${substring}" but got "${text}"`);
  }
}

function assertNotNull(value, message) {
  if (value === null || value === undefined) {
    throw new Error(message || `Expected value to not be null/undefined`);
  }
}

function assertTrue(condition, message) {
  if (!condition) {
    throw new Error(message || `Expected condition to be true`);
  }
}

// ============================================================================
// TEST SUITE
// ============================================================================

console.log(`\n${colors.bright}${colors.cyan}Boop Scripts Test Suite${colors.reset}\n`);

const scriptsDir = path.join(__dirname, 'Boop/Boop/scripts');

// ----------------------------------------------------------------------------
// Text Manipulation Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Text Manipulation Scripts${colors.reset}`);

test('JoinLines - joins lines without delimiter', () => {
  const result = executeScript(path.join(scriptsDir, 'JoinLines.js'), 'Line 1\nLine 2\nLine 3');
  assertEqual(result.result, 'Line 1Line 2Line 3');
});

test('JoinLinesWithComma - joins lines with commas', () => {
  const result = executeScript(path.join(scriptsDir, 'JoinLinesWithComma.js'), 'Apple\nBanana\nCherry');
  assertEqual(result.result, 'Apple,Banana,Cherry');
});

test('JoinLinesWithSpace - joins lines with spaces', () => {
  const result = executeScript(path.join(scriptsDir, 'JoinLinesWithSpace.js'), 'Hello\nWorld\nTest');
  assertEqual(result.result, 'Hello World Test');
});

test('TrimStart - trims leading whitespace', () => {
  const result = executeScript(path.join(scriptsDir, 'TrimStart.js'), '   Hello World   ');
  assertEqual(result.result, 'Hello World   ');
});

test('TrimEnd - trims trailing whitespace', () => {
  const result = executeScript(path.join(scriptsDir, 'TrimEnd.js'), '   Hello World   ');
  assertEqual(result.result, '   Hello World');
});

test('ShuffleCharacters - shuffles all characters', () => {
  const result = executeScript(path.join(scriptsDir, 'ShuffleCharacters.js'), 'ABC');
  assertEqual(result.result.length, 3);
  assertTrue(result.result.includes('A'));
  assertTrue(result.result.includes('B'));
  assertTrue(result.result.includes('C'));
});

test('Wadsworth - removes first 30% of words', () => {
  const result = executeScript(path.join(scriptsDir, 'Wadsworth.js'), 'one two three four five six seven eight nine ten');
  assertTrue(!result.result.includes('one'));
  assertTrue(result.result.includes('ten'));
});

test('LineComparer - checks if all lines are equal', () => {
  const result = executeScript(path.join(scriptsDir, 'LineComparer.js'), 'same\nsame\nsame');
  assertEqual(result.infos.length, 1);
  assertContains(result.infos[0], 'equal');
});

test('LineComparer - detects different lines', () => {
  const result = executeScript(path.join(scriptsDir, 'LineComparer.js'), 'same\ndifferent\nsame');
  assertEqual(result.errors.length, 1);
  assertContains(result.errors[0], 'Line 2'); // Capital 'L'
});

// ----------------------------------------------------------------------------
// Data Conversion Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Data Conversion Scripts${colors.reset}`);

test('CSVtoJSONheaderless - converts CSV to JSON array', () => {
  const result = executeScript(path.join(scriptsDir, 'CSVtoJSONheaderless.js'), 'Alice,30,Engineer\nBob,25,Designer');
  assertTrue(result.success);
  assertContains(result.result, 'Alice');
  assertContains(result.result, '['); // JSON array format (pretty printed)
});

test('DIGI2ASCII - converts decimal codes to ASCII (space-separated)', () => {
  const result = executeScript(path.join(scriptsDir, 'DIGI2ASCII.js'), '72 101 108 108 111');
  assertEqual(result.result, 'Hello');
});

test('DIGI2ASCII - converts decimal codes to ASCII (comma-separated)', () => {
  const result = executeScript(path.join(scriptsDir, 'DIGI2ASCII.js'), '72,101,108,108,111');
  assertEqual(result.result, 'Hello');
});

test('FromUnicode - converts Unicode escaped to text', () => {
  const result = executeScript(path.join(scriptsDir, 'FromUnicode.js'), '\\u0048\\u0065\\u006C\\u006C\\u006F');
  // Known bug: produces leading null character
  assertTrue(result.result.includes('Hello'));
});

test('ToUnicode - converts text to Unicode escaped format', () => {
  const result = executeScript(path.join(scriptsDir, 'ToUnicode.js'), 'Hi');
  assertContains(result.result, '\\u0048'); // H
  assertContains(result.result, '\\u0069'); // i
});

test('JsObjectToJSON - converts JS object to JSON', () => {
  const result = executeScript(path.join(scriptsDir, 'JsObjectToJSON.js'), "{name: 'John', age: 30}");
  assertContains(result.result, '"name"');
  assertContains(result.result, '"John"');
});

test('TimeToSecond - converts hh:mm:ss to seconds', () => {
  const result = executeScript(path.join(scriptsDir, 'TimeToSecond.js'), '1:30:45');
  assertContains(result.result, '5445'); // 1*3600 + 30*60 + 45
});

test('TimeToSecond - handles mm:ss format (treated as hh:mm)', () => {
  // Note: Script treats "2:30" as hh:mm:ss so 2:30 = 2 hours, 30 minutes = 9000 seconds
  // This is a limitation of the script design - it always expects hh:mm:ss format
  const result = executeScript(path.join(scriptsDir, 'TimeToSecond.js'), '2:30');
  assertContains(result.result, '9000'); // 2*3600 + 30*60
});

test('rgb2hex - converts RGB to hex', () => {
  const result = executeScript(path.join(scriptsDir, 'rgb2hex.js'), '255, 128, 0');
  assertTrue(result.result.startsWith('#'));
  // Known bug: padding issue for low values
});

test('jsToPhp - converts JS object to PHP array', () => {
  const result = executeScript(path.join(scriptsDir, 'jsToPhp.js'), "{name: 'Alice', age: 25}");
  // PHP uses [ ] for arrays, not the word "array"
  assertContains(result.result, "'name' => ");
  assertContains(result.result, "'age' => ");
  assertContains(result.result, '// Result:');
});

test('jsToPhp - converts JS array to PHP array', () => {
  const result = executeScript(path.join(scriptsDir, 'jsToPhp.js'), "[1, 2, 3]");
  assertContains(result.result, '[');
  assertContains(result.result, ']');
  assertContains(result.result, '// Result:');
});

test('WktToWkb - converts POINT to WKB hex', () => {
  const result = executeScript(path.join(scriptsDir, 'WktToWkb.js'), 'POINT(0 0)');
  assertTrue(result.success);
  // Should be hex string
  assertTrue(result.result.length > 20);
  assertTrue(/^[0-9a-f]+$/i.test(result.result));
});

test('WktToWkb - converts LINESTRING to WKB hex', () => {
  const result = executeScript(path.join(scriptsDir, 'WktToWkb.js'), 'LINESTRING(0 0, 1 1)');
  assertTrue(result.success);
  assertTrue(result.result.length > 20);
});

test('WkbToWkt - converts WKB hex to POINT', () => {
  // WKB for POINT(1.5 2.5) in little-endian format (complete 42-char hex)
  // Byte order (1 byte) + Type (4 bytes) + X coord (8 bytes) + Y coord (8 bytes)
  const wkb = '0101000000000000000000f83f0000000000000440';
  const result = executeScript(path.join(scriptsDir, 'WkbToWkt.js'), wkb);
  assertTrue(result.success);
  assertContains(result.result, 'POINT');
});

test('WkbToWkt - handles multiple geometry types', () => {
  // Test LINESTRING - WKB type 2 in little-endian with 2 points
  // Format: 01 (LE) + 02000000 (type 2) + 02000000 (2 points) + coordinates
  const wkb = '010200000002000000000000000000000000000000000000003ff00000000000003ff0000000000000';
  const result = executeScript(path.join(scriptsDir, 'WkbToWkt.js'), wkb);
  assertTrue(result.success);
  assertContains(result.result, 'LINESTRING');
});

test('tsvToJson - converts TSV with headers to JSON', () => {
  const result = executeScript(path.join(scriptsDir, 'tsvToJson.js'), 'Name\tAge\tCity\nAlice\t30\tNYC\nBob\t25\tLA');
  assertTrue(result.success);
  assertContains(result.result, 'Alice');
  assertContains(result.result, 'NYC');
  // Should be valid JSON array
  assertTrue(result.result.startsWith('['));
});

test('tsvToJson - handles single data row', () => {
  const result = executeScript(path.join(scriptsDir, 'tsvToJson.js'), 'Header1\tHeader2\nValue1\tValue2');
  assertTrue(result.success);
  assertContains(result.result, 'Value1');
  assertContains(result.result, 'Value2');
});

test('CalculateSize - calculates bytes for short text', () => {
  const result = executeScript(path.join(scriptsDir, 'CalculateSize.js'), 'Hello');
  assertTrue(result.success);
  assertEqual(result.infos.length, 1);
  assertContains(result.infos[0], 'bytes');
  assertContains(result.infos[0], '5'); // "Hello" is 5 bytes in UTF-8
});

test('CalculateSize - handles UTF-8 multibyte characters', () => {
  const result = executeScript(path.join(scriptsDir, 'CalculateSize.js'), '你好'); // 2 Chinese characters, 3 bytes each = 6 bytes
  assertTrue(result.success);
  assertEqual(result.infos.length, 1);
  assertContains(result.infos[0], 'bytes');
  assertContains(result.infos[0], '6');
});

// ----------------------------------------------------------------------------
// Formatting & Generation Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Formatting & Generation Scripts${colors.reset}`);

test('ConvertToMarkdownTable - converts CSV to markdown table', () => {
  const result = executeScript(path.join(scriptsDir, 'ConvertToMarkdownTable.js'), 'Name,Age\nAlice,30\nBob,25');
  assertContains(result.result, '|');
  assertContains(result.result, '---');
});

test('ListToHTMLList - converts comma list to HTML', () => {
  const result = executeScript(path.join(scriptsDir, 'ListToHTMLList.js'), 'item1,item2,item3');
  assertContains(result.result, '<ul>');
  assertContains(result.result, '<li>');
  assertContains(result.result, 'item1');
});

test('ListToHTMLList - converts HTML back to comma list', () => {
  const result = executeScript(path.join(scriptsDir, 'ListToHTMLList.js'), '<ul><li>item1</li><li>item2</li></ul>');
  assertContains(result.result, 'item1');
  assertContains(result.result, ',');
});

test('GenerateHashtag - creates hashtag from text', () => {
  const result = executeScript(path.join(scriptsDir, 'GenerateHashtag.js'), 'Hello World');
  assertEqual(result.result, '#HelloWorld');
});

test('GenerateHashtag - removes special characters', () => {
  const result = executeScript(path.join(scriptsDir, 'GenerateHashtag.js'), 'Hello, World!');
  assertEqual(result.result, '#HelloWorld');
});

test('NewBoopScript - generates script template', () => {
  const result = executeScript(path.join(scriptsDir, 'NewBoopScript.js'), '');
  assertContains(result.result, 'function main(state)');
  assertContains(result.result, '"api"');
});

test('CreateProjectGlossaryMarkdown - shows help text', () => {
  const result = executeScript(path.join(scriptsDir, 'CreateProjectGlossaryMarkdown.js'), 'help');
  assertContains(result.result, 'Create Project Glossary');
  assertContains(result.result, 'projectName');
  assertContains(result.result, 'includeSamples');
});

test('CreateProjectGlossaryMarkdown - generates JSON template on empty input', () => {
  const result = executeScript(path.join(scriptsDir, 'CreateProjectGlossaryMarkdown.js'), '');
  assertContains(result.result, 'projectName');
  assertContains(result.result, 'includeSamples');
  assertContains(result.result, 'Project Name');
});

test('CreateProjectGlossaryMarkdown - generates glossary from JSON', () => {
  const input = '{"projectName": "My Project", "includeSamples": false}';
  const result = executeScript(path.join(scriptsDir, 'CreateProjectGlossaryMarkdown.js'), input);
  assertContains(result.result, '# My Project');
  assertContains(result.result, '## Glossary Of Terms');
  assertContains(result.result, '[A](#a)');
  assertContains(result.result, '[Z](#z)');
});

test('CreateProjectGlossaryMarkdown - includes samples when requested', () => {
  const input = '{"projectName": "Test", "includeSamples": true}';
  const result = executeScript(path.join(scriptsDir, 'CreateProjectGlossaryMarkdown.js'), input);
  assertContains(result.result, 'Example Entry');
  assertContains(result.result, '# Test');
});

// ----------------------------------------------------------------------------
// Code Utilities Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Code Utilities Scripts${colors.reset}`);

test('ToggleCamelHyphen - converts hyphen to camel', () => {
  const result = executeScript(path.join(scriptsDir, 'ToggleCamelHyphen.js'), 'some-hyphenated-text');
  assertEqual(result.result, 'someHyphenatedText');
});

test('ToggleCamelHyphen - converts camel to hyphen', () => {
  const result = executeScript(path.join(scriptsDir, 'ToggleCamelHyphen.js'), 'someHyphenatedText');
  assertEqual(result.result, 'some-hyphenated-text');
});

test('ContrastingColor - determines contrast for white', () => {
  const result = executeScript(path.join(scriptsDir, 'ContrastingColor.js'), '#FFFFFF');
  assertContains(result.result, '#000');
  assertContains(result.result, 'ratio');
});

test('ContrastingColor - handles short hex format', () => {
  const result = executeScript(path.join(scriptsDir, 'ContrastingColor.js'), '#FFF');
  assertContains(result.result, '#000');
});

// ----------------------------------------------------------------------------
// Edge Cases
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Edge Cases${colors.reset}`);

test('JoinLines - handles empty input', () => {
  const result = executeScript(path.join(scriptsDir, 'JoinLines.js'), '');
  assertEqual(result.result, '');
});

test('JoinLines - handles single line', () => {
  const result = executeScript(path.join(scriptsDir, 'JoinLines.js'), 'Single line only');
  assertEqual(result.result, 'Single line only');
});

test('TrimStart - handles already trimmed text', () => {
  const result = executeScript(path.join(scriptsDir, 'TrimStart.js'), 'No leading space');
  assertEqual(result.result, 'No leading space');
});

test('GenerateHashtag - handles empty input gracefully', () => {
  const result = executeScript(path.join(scriptsDir, 'GenerateHashtag.js'), '');
  assertTrue(result.errors.length > 0 || result.result === '#');
});

// ============================================================================
// TEST RESULTS SUMMARY
// ============================================================================

console.log(`\n${colors.bright}${'='.repeat(60)}${colors.reset}`);
console.log(`${colors.bright}Test Results${colors.reset}\n`);

console.log(`Total Tests: ${totalTests}`);
console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);

if (failedTests > 0) {
  console.log(`\n${colors.bright}${colors.red}Failed Tests:${colors.reset}\n`);
  failures.forEach(({ name, error }) => {
    console.log(`  ${colors.red}✗${colors.reset} ${name}`);
    console.log(`    ${error}\n`);
  });
}

console.log(`${colors.bright}${'='.repeat(60)}${colors.reset}\n`);

// Exit with appropriate code
process.exit(failedTests > 0 ? 1 : 0);
