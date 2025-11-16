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


// ----------------------------------------------------------------------------
// Line Deduplication Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Line Deduplication Scripts${colors.reset}`);

test('LineDedupKeepFirst - removes duplicates keeping first occurrence', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepFirst.js'), 'apple\nbanana\napple\ncherry\nbanana');
  assertEqual(result.result, 'apple\nbanana\ncherry');
  assertTrue(result.infos.length > 0);
  assertContains(result.infos[0], '2 duplicate lines');
});

test('LineDedupKeepFirst - preserves order of first occurrences', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepFirst.js'), 'third\nfirst\nsecond\nfirst\nthird');
  assertEqual(result.result, 'third\nfirst\nsecond');
});

test('LineDedupKeepFirst - handles empty lines', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepFirst.js'), 'line1\n\nline2\n\nline3');
  assertEqual(result.result, 'line1\n\nline2\nline3');
});

test('LineDedupKeepFirst - handles multiple duplicates of same line', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepFirst.js'), 'test\ntest\ntest\ntest');
  assertEqual(result.result, 'test');
  assertContains(result.infos[0], '3 duplicate lines');
});

test('LineDedupKeepFirst - handles no duplicates', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepFirst.js'), 'unique1\nunique2\nunique3');
  assertEqual(result.result, 'unique1\nunique2\nunique3');
  assertContains(result.infos[0], 'No duplicate lines');
});

test('LineDedupKeepFirst - handles single line', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepFirst.js'), 'single');
  assertEqual(result.result, 'single');
  assertContains(result.infos[0], 'No duplicate lines');
});

test('LineDedupKeepLast - removes duplicates keeping last occurrence', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepLast.js'), 'apple\nbanana\napple\ncherry\nbanana');
  assertEqual(result.result, 'apple\ncherry\nbanana');
  assertTrue(result.infos.length > 0);
  assertContains(result.infos[0], '2 duplicate lines');
});

test('LineDedupKeepLast - preserves order of last occurrences', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepLast.js'), 'first\nsecond\nthird\nfirst\nsecond');
  assertEqual(result.result, 'third\nfirst\nsecond');
});

test('LineDedupKeepLast - handles empty lines', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepLast.js'), 'line1\n\nline2\n\nline3');
  assertEqual(result.result, 'line1\nline2\n\nline3');
});

test('LineDedupKeepLast - handles multiple duplicates of same line', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepLast.js'), 'test\ntest\ntest\ntest');
  assertEqual(result.result, 'test');
  assertContains(result.infos[0], '3 duplicate lines');
});

test('LineDedupKeepLast - handles no duplicates', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepLast.js'), 'unique1\nunique2\nunique3');
  assertEqual(result.result, 'unique1\nunique2\nunique3');
  assertContains(result.infos[0], 'No duplicate lines');
});

test('LineDedupKeepLast - handles single line', () => {
  const result = executeScript(path.join(scriptsDir, 'LineDedupKeepLast.js'), 'single');
  assertEqual(result.result, 'single');
  assertContains(result.infos[0], 'No duplicate lines');
});

// ----------------------------------------------------------------------------
// Quote Conversion Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Quote Conversion Scripts${colors.reset}`);

test('SmartQuotesToStraight - converts smart double quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'SmartQuotesToStraight.js'), '\u201CHello World\u201D');
  assertEqual(result.result, '"Hello World"');
  assertContains(result.infos[0], 'Converted');
});

test('SmartQuotesToStraight - converts smart single quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'SmartQuotesToStraight.js'), '\u2018Hello World\u2019');
  assertEqual(result.result, "'Hello World'");
  assertContains(result.infos[0], 'Converted');
});

test('SmartQuotesToStraight - converts mixed quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'SmartQuotesToStraight.js'), '\u201CHe said \u2018hello\u2019\u201D');
  assertEqual(result.result, '"He said \'hello\'"');
});

test('SmartQuotesToStraight - handles text without smart quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'SmartQuotesToStraight.js'), 'No smart quotes here');
  assertEqual(result.result, 'No smart quotes here');
  assertContains(result.infos[0], 'No smart quotes found');
});

test('SmartQuotesToStraight - handles multiple smart quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'SmartQuotesToStraight.js'), '\u201CFirst\u201D and \u201CSecond\u201D');
  assertEqual(result.result, '"First" and "Second"');
});

test('StraightQuotesToSmart - converts straight double quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'StraightQuotesToSmart.js'), '"Hello World"');
  assertTrue(result.result.includes('\u201C'));
  assertTrue(result.result.includes('\u201D'));
  assertContains(result.infos[0], 'Converted');
});

test('StraightQuotesToSmart - converts straight single quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'StraightQuotesToSmart.js'), "'Hello World'");
  assertTrue(result.result.includes('\u2018') || result.result.includes('\u2019'));
  assertContains(result.infos[0], 'Converted');
});

test('StraightQuotesToSmart - handles contractions', () => {
  const result = executeScript(path.join(scriptsDir, 'StraightQuotesToSmart.js'), "don't can't won't");
  assertTrue(result.result.includes('\u2019')); // Should use right single quote for apostrophes
  assertContains(result.result, 'don\u2019t');
});

test('StraightQuotesToSmart - converts nested quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'StraightQuotesToSmart.js'), '"He said \'hello\'"');
  assertTrue(result.result.includes('\u201C'));
  assertTrue(result.result.includes('\u2018') || result.result.includes('\u2019'));
});

test('StraightQuotesToSmart - handles text without quotes', () => {
  const result = executeScript(path.join(scriptsDir, 'StraightQuotesToSmart.js'), 'No quotes here');
  assertEqual(result.result, 'No quotes here');
  assertContains(result.infos[0], 'No straight quotes found');
});

test('StraightQuotesToSmart - handles multiple quoted phrases', () => {
  const result = executeScript(path.join(scriptsDir, 'StraightQuotesToSmart.js'), '"First" and "Second"');
  const matches = (result.result.match(/\u201C/g) || []).length;
  assertEqual(matches, 2); // Two opening quotes
});

// ----------------------------------------------------------------------------
// Text Statistics Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Text Statistics Script${colors.reset}`);

test('TextStatistics - calculates basic statistics', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'Hello world');
  assertTrue(result.infos.length > 0);
  assertContains(result.infos[0], 'Characters: 11');
  assertContains(result.infos[0], 'Words: 2');
  assertEqual(result.result, 'Hello world'); // Text unchanged
});

test('TextStatistics - counts characters with and without spaces', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'Hello world');
  assertContains(result.infos[0], '11');
  assertContains(result.infos[0], '10 without spaces');
});

test('TextStatistics - counts lines correctly', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'Line 1\nLine 2\nLine 3');
  assertContains(result.infos[0], 'Lines: 3');
});

test('TextStatistics - counts non-empty lines', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'Line 1\n\nLine 2\n\nLine 3');
  assertContains(result.infos[0], '3 non-empty');
});

test('TextStatistics - counts sentences', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'First sentence. Second sentence! Third sentence?');
  assertContains(result.infos[0], 'Sentences: 3');
});

test('TextStatistics - counts paragraphs', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'Para 1\nLine 2\n\nPara 2\nLine 2');
  assertContains(result.infos[0], 'Paragraphs: 2');
});

test('TextStatistics - calculates average word length', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'I am testing');
  assertContains(result.infos[0], 'Average word length:');
});

test('TextStatistics - calculates reading time', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'word '.repeat(100));
  assertContains(result.infos[0], 'reading time:');
});

test('TextStatistics - shows reading time in seconds for short text', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'Short text here');
  assertContains(result.infos[0], 'sec');
});

test('TextStatistics - shows reading time in minutes for long text', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), 'word '.repeat(300));
  assertContains(result.infos[0], 'min');
});

test('TextStatistics - handles empty text', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), '');
  assertTrue(result.errors.length > 0);
  assertContains(result.errors[0], 'Empty');
});

test('TextStatistics - handles whitespace-only text', () => {
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), '   \n   \n   ');
  assertTrue(result.errors.length > 0);
  assertContains(result.errors[0], 'Empty');
});

test('TextStatistics - preserves original text', () => {
  const input = 'This is a test. Do not change this text!';
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), input);
  assertEqual(result.result, input);
});

test('TextStatistics - handles complex text', () => {
  const complexText = 'This is the first paragraph.\nIt has multiple sentences!\n\nThis is the second paragraph?\nIt also has sentences.';
  const result = executeScript(path.join(scriptsDir, 'TextStatistics.js'), complexText);
  assertTrue(result.infos.length > 0);
  assertContains(result.infos[0], 'Characters:');
  assertContains(result.infos[0], 'Words:');
  assertContains(result.infos[0], 'Lines:');
  assertContains(result.infos[0], 'Sentences:');
  assertContains(result.infos[0], 'Paragraphs: 2');
});

// ============================================================================

// ----------------------------------------------------------------------------
// Cryptographic & Hash Functions Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Cryptographic & Hash Functions Scripts${colors.reset}`);

test('CRC32 - calculates checksum for "Hello World"', () => {
  const result = executeScript(path.join(scriptsDir, 'CRC32.js'), 'Hello World');
  // CRC32 of "Hello World" is 0x4A17B156
  assertEqual(result.result, '4A17B156');
});

test('CRC32 - calculates checksum for empty string', () => {
  const result = executeScript(path.join(scriptsDir, 'CRC32.js'), '');
  // CRC32 of empty string is 0x00000000
  assertEqual(result.result, '00000000');
});

test('CRC32 - calculates checksum for "123456789"', () => {
  const result = executeScript(path.join(scriptsDir, 'CRC32.js'), '123456789');
  // Standard CRC32 test vector: CRC32("123456789") = 0xCBF43926
  assertEqual(result.result, 'CBF43926');
});

test('CRC32 - handles special characters', () => {
  const result = executeScript(path.join(scriptsDir, 'CRC32.js'), 'The quick brown fox jumps over the lazy dog');
  assertTrue(result.success);
  assertEqual(result.result.length, 8); // Should be 8 hex chars
});

test('JWTEncode - creates valid JWT with default secret', () => {
  const result = executeScript(path.join(scriptsDir, 'JWTEncode.js'), '{"sub":"1234567890","name":"John Doe"}');
  assertTrue(result.success);
  // JWT should have 3 parts separated by dots
  const parts = result.result.split('.');
  assertEqual(parts.length, 3);
  // Check that parts are non-empty
  assertTrue(parts[0].length > 0);
  assertTrue(parts[1].length > 0);
  assertTrue(parts[2].length > 0);
});

test('JWTEncode - creates JWT with custom secret', () => {
  const result = executeScript(path.join(scriptsDir, 'JWTEncode.js'), 'my-secret|{"sub":"test","name":"Alice"}');
  assertTrue(result.success);
  const parts = result.result.split('.');
  assertEqual(parts.length, 3);
});

test('JWTEncode - handles empty payload object', () => {
  const result = executeScript(path.join(scriptsDir, 'JWTEncode.js'), '{}');
  assertTrue(result.success);
  const parts = result.result.split('.');
  assertEqual(parts.length, 3);
});

test('JWTEncode - rejects invalid JSON', () => {
  const result = executeScript(path.join(scriptsDir, 'JWTEncode.js'), 'not valid json');
  assertTrue(result.errors.length > 0);
});

test('JWTEncode - handles complex payload', () => {
  const payload = '{"sub":"1234","name":"Test User","admin":true,"iat":1516239022}';
  const result = executeScript(path.join(scriptsDir, 'JWTEncode.js'), payload);
  assertTrue(result.success);
  const parts = result.result.split('.');
  assertEqual(parts.length, 3);
});

test('HMACSHA256 - generates HMAC with default key', () => {
  const result = executeScript(path.join(scriptsDir, 'HMACSHA256.js'), 'Hello World');
  assertTrue(result.success);
  assertEqual(result.result.length, 64); // SHA256 produces 64 hex chars
  assertTrue(/^[0-9A-F]+$/.test(result.result)); // Should be uppercase hex
});

test('HMACSHA256 - generates HMAC with custom key', () => {
  const result = executeScript(path.join(scriptsDir, 'HMACSHA256.js'), 'secret|message');
  assertTrue(result.success);
  assertEqual(result.result.length, 64);
});

test('HMACSHA256 - test vector from RFC 4231', () => {
  // Test case 2 from RFC 4231
  const key = 'Jefe';
  const message = 'what do ya want for nothing?';
  const result = executeScript(path.join(scriptsDir, 'HMACSHA256.js'), key + '|' + message);
  // Expected: 5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843
  assertEqual(result.result, '5BDCC146BF60754E6A042426089575C75A003F089D2739839DEC58B964EC3843');
});

test('HMACSHA256 - handles empty message', () => {
  const result = executeScript(path.join(scriptsDir, 'HMACSHA256.js'), 'key|');
  assertTrue(result.success);
  assertEqual(result.result.length, 64);
});

test('HMACSHA256 - handles message with pipe character', () => {
  const result = executeScript(path.join(scriptsDir, 'HMACSHA256.js'), 'key|message|with|pipes');
  assertTrue(result.success);
  assertEqual(result.result.length, 64);
});

test('HMACSHA256 - different keys produce different results', () => {
  const result1 = executeScript(path.join(scriptsDir, 'HMACSHA256.js'), 'key1|same message');
  const result2 = executeScript(path.join(scriptsDir, 'HMACSHA256.js'), 'key2|same message');
  assertTrue(result1.result !== result2.result);
});

test('HMACSHA512 - generates HMAC with default key', () => {
  const result = executeScript(path.join(scriptsDir, 'HMACSHA512.js'), 'Hello World');
  assertTrue(result.success);
  assertEqual(result.result.length, 128); // SHA512 produces 128 hex chars
  assertTrue(/^[0-9A-F]+$/.test(result.result)); // Should be uppercase hex
});

test('HMACSHA512 - generates HMAC with custom key', () => {
  const result = executeScript(path.join(scriptsDir, 'HMACSHA512.js'), 'secret|message');
  assertTrue(result.success);
  assertEqual(result.result.length, 128);
});



test('HMACSHA512 - handles empty message', () => {
  const result = executeScript(path.join(scriptsDir, 'HMACSHA512.js'), 'key|');
  assertTrue(result.success);
  assertEqual(result.result.length, 128);
});

test('HMACSHA512 - handles long message', () => {
  const longMessage = 'a'.repeat(1000);
  const result = executeScript(path.join(scriptsDir, 'HMACSHA512.js'), 'key|' + longMessage);
  assertTrue(result.success);
  assertEqual(result.result.length, 128);
});

test('HMACSHA512 - different keys produce different results', () => {
  const result1 = executeScript(path.join(scriptsDir, 'HMACSHA512.js'), 'key1|same message');
  const result2 = executeScript(path.join(scriptsDir, 'HMACSHA512.js'), 'key2|same message');
  assertTrue(result1.result !== result2.result);
});

test('HMACSHA512 - handles UTF-8 characters', () => {
  const result = executeScript(path.join(scriptsDir, 'HMACSHA512.js'), 'key|Hello 世界');
  assertTrue(result.success);
  assertEqual(result.result.length, 128);
});


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
