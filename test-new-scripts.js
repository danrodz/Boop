#!/usr/bin/env node

/**
 * Test suite for newly implemented Boop scripts:
 * - UUIDv4.js
 * - UUIDv5.js
 * - GeneratePassword.js
 * - CurrentUnixTimestamp.js
 * - CurrentUnixTimestampMs.js
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
      let libPath = path.join(__dirname, 'Boop/Boop/scripts/lib', moduleName);

      // Add .js extension if not present
      if (!libPath.endsWith('.js')) {
        libPath += '.js';
      }

      if (fs.existsSync(libPath)) {
        const moduleCode = fs.readFileSync(libPath, 'utf8');
        const moduleContext = {
          module: { exports: {} },
          exports: {},
          global: {},
          define: undefined,
        };
        // Set the global context for the IIFE
        moduleContext.global.global = moduleContext.global;
        const sandbox = vm.createContext(moduleContext);
        vm.runInContext(moduleCode, sandbox);
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

console.log(`\n${colors.bright}${colors.cyan}New Boop Scripts Test Suite${colors.reset}\n`);

const scriptsDir = path.join(__dirname, 'Boop/Boop/scripts');

// ----------------------------------------------------------------------------
// UUID Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}UUID Generation Scripts${colors.reset}`);

test('UUIDv4 - generates valid UUID v4 format', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv4.js'), '');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertTrue(uuidRegex.test(result.result), `Expected valid UUID v4 but got: ${result.result}`);
});

test('UUIDv4 - generates different UUIDs on multiple runs', () => {
  const result1 = executeScript(path.join(scriptsDir, 'UUIDv4.js'), '');
  const result2 = executeScript(path.join(scriptsDir, 'UUIDv4.js'), '');
  assertTrue(result1.result !== result2.result, 'UUIDs should be different');
});

test('UUIDv4 - version field is correct (4)', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv4.js'), '');
  const version = result.result.charAt(14);
  assertEqual(version, '4', 'Version field should be 4');
});

test('UUIDv4 - variant field is correct', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv4.js'), '');
  const variant = result.result.charAt(19).toLowerCase();
  assertTrue(['8', '9', 'a', 'b'].includes(variant), `Variant should be 8, 9, a, or b but got ${variant}`);
});

test('UUIDv5 - generates valid UUID v5 format with default namespace', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'example.com');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertTrue(uuidRegex.test(result.result), `Expected valid UUID v5 but got: ${result.result}`);
});

test('UUIDv5 - generates same UUID for same input (deterministic)', () => {
  const result1 = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'example.com');
  const result2 = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'example.com');
  assertEqual(result1.result, result2.result, 'UUID v5 should be deterministic');
});

test('UUIDv5 - generates different UUID for different inputs', () => {
  const result1 = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'example.com');
  const result2 = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'different.com');
  assertTrue(result1.result !== result2.result, 'Different names should produce different UUIDs');
});

test('UUIDv5 - accepts custom namespace (DNS)', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'DNS|example.com');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertTrue(uuidRegex.test(result.result));
});

test('UUIDv5 - accepts custom namespace (URL)', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'URL|https://example.com');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertTrue(uuidRegex.test(result.result));
});

test('UUIDv5 - accepts custom namespace (OID)', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'OID|1.2.3.4');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertTrue(uuidRegex.test(result.result));
});

test('UUIDv5 - accepts custom namespace (X500)', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'X500|cn=test');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertTrue(uuidRegex.test(result.result));
});

test('UUIDv5 - accepts custom UUID namespace', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), '6ba7b810-9dad-11d1-80b4-00c04fd430c8|example.com');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertTrue(uuidRegex.test(result.result));
});

test('UUIDv5 - version field is correct (5)', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'example.com');
  const version = result.result.charAt(14);
  assertEqual(version, '5', 'Version field should be 5');
});

test('UUIDv5 - variant field is correct', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'example.com');
  const variant = result.result.charAt(19).toLowerCase();
  assertTrue(['8', '9', 'a', 'b'].includes(variant), `Variant should be 8, 9, a, or b but got ${variant}`);
});

test('UUIDv5 - handles empty input with error', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), '');
  assertTrue(result.errors.length > 0, 'Should post error for empty input');
});

test('UUIDv5 - handles invalid namespace with error', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'INVALID|example.com');
  assertTrue(result.errors.length > 0, 'Should post error for invalid namespace');
});

test('UUIDv5 - handles name with pipe character', () => {
  const result = executeScript(path.join(scriptsDir, 'UUIDv5.js'), 'DNS|example.com|with|pipes');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assertTrue(uuidRegex.test(result.result));
});

// ----------------------------------------------------------------------------
// Password Generation Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Password Generation Script${colors.reset}`);

test('GeneratePassword - generates default 16 character password', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '');
  assertEqual(result.result.length, 16);
});

test('GeneratePassword - generates password of specified length', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '24');
  assertEqual(result.result.length, 24);
});

test('GeneratePassword - generates different passwords on multiple runs', () => {
  const result1 = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '16');
  const result2 = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '16');
  assertTrue(result1.result !== result2.result, 'Passwords should be random');
});

test('GeneratePassword - includes mixed character types for length >= 4', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '16');
  const password = result.result;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
  assertTrue(hasUpper && hasLower && hasNumber && hasSymbol, 'Password should contain all character types');
});

test('GeneratePassword - handles short length (1 char)', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '1');
  assertEqual(result.result.length, 1);
});

test('GeneratePassword - handles short length (3 chars)', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '3');
  assertEqual(result.result.length, 3);
});

test('GeneratePassword - handles medium length (32 chars)', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '32');
  assertEqual(result.result.length, 32);
});

test('GeneratePassword - handles long length (128 chars)', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '128');
  assertEqual(result.result.length, 128);
});

test('GeneratePassword - rejects length > 128', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '129');
  assertTrue(result.errors.length > 0, 'Should post error for length > 128');
});

test('GeneratePassword - rejects invalid length (zero)', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '0');
  assertTrue(result.errors.length > 0, 'Should post error for zero length');
});

test('GeneratePassword - rejects invalid length (negative)', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '-5');
  assertTrue(result.errors.length > 0, 'Should post error for negative length');
});

test('GeneratePassword - rejects invalid length (non-numeric)', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), 'abc');
  assertTrue(result.errors.length > 0, 'Should post error for non-numeric length');
});

test('GeneratePassword - rejects invalid length (decimal)', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '16.5');
  // parseInt will convert '16.5' to 16, which is valid
  assertEqual(result.result.length, 16);
});

test('GeneratePassword - only contains valid characters', () => {
  const result = executeScript(path.join(scriptsDir, 'GeneratePassword.js'), '50');
  const validChars = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/;
  assertTrue(validChars.test(result.result), 'Password should only contain valid characters');
});

// ----------------------------------------------------------------------------
// Timestamp Tests
// ----------------------------------------------------------------------------

console.log(`\n${colors.bright}Timestamp Scripts${colors.reset}`);

test('CurrentUnixTimestamp - outputs valid timestamp in seconds', () => {
  const result = executeScript(path.join(scriptsDir, 'CurrentUnixTimestamp.js'), '');
  const timestamp = parseInt(result.result, 10);
  assertTrue(!isNaN(timestamp), 'Timestamp should be a valid number');
  assertTrue(timestamp > 1600000000, 'Timestamp should be reasonable (after Sept 2020)');
  assertTrue(timestamp < 2000000000, 'Timestamp should be reasonable (before May 2033)');
});

test('CurrentUnixTimestamp - generates numeric output only', () => {
  const result = executeScript(path.join(scriptsDir, 'CurrentUnixTimestamp.js'), '');
  assertTrue(/^\d+$/.test(result.result), 'Should only contain digits');
});

test('CurrentUnixTimestamp - output has 10 digits (seconds precision)', () => {
  const result = executeScript(path.join(scriptsDir, 'CurrentUnixTimestamp.js'), '');
  assertTrue(result.result.length === 10, `Expected 10 digits but got ${result.result.length}`);
});

test('CurrentUnixTimestamp - ignores input text', () => {
  const result = executeScript(path.join(scriptsDir, 'CurrentUnixTimestamp.js'), 'Some random text');
  const timestamp = parseInt(result.result, 10);
  assertTrue(!isNaN(timestamp), 'Should ignore input and return timestamp');
  assertTrue(result.result.length === 10);
});

test('CurrentUnixTimestampMs - outputs valid timestamp in milliseconds', () => {
  const result = executeScript(path.join(scriptsDir, 'CurrentUnixTimestampMs.js'), '');
  const timestamp = parseInt(result.result, 10);
  assertTrue(!isNaN(timestamp), 'Timestamp should be a valid number');
  assertTrue(timestamp > 1600000000000, 'Timestamp should be reasonable (after Sept 2020)');
  assertTrue(timestamp < 2000000000000, 'Timestamp should be reasonable (before May 2033)');
});

test('CurrentUnixTimestampMs - generates numeric output only', () => {
  const result = executeScript(path.join(scriptsDir, 'CurrentUnixTimestampMs.js'), '');
  assertTrue(/^\d+$/.test(result.result), 'Should only contain digits');
});

test('CurrentUnixTimestampMs - output has 13 digits (milliseconds precision)', () => {
  const result = executeScript(path.join(scriptsDir, 'CurrentUnixTimestampMs.js'), '');
  assertTrue(result.result.length === 13, `Expected 13 digits but got ${result.result.length}`);
});

test('CurrentUnixTimestampMs - ignores input text', () => {
  const result = executeScript(path.join(scriptsDir, 'CurrentUnixTimestampMs.js'), 'Some random text');
  const timestamp = parseInt(result.result, 10);
  assertTrue(!isNaN(timestamp), 'Should ignore input and return timestamp');
  assertTrue(result.result.length === 13);
});

test('CurrentUnixTimestampMs - is approximately 1000x CurrentUnixTimestamp', () => {
  const resultSec = executeScript(path.join(scriptsDir, 'CurrentUnixTimestamp.js'), '');
  const resultMs = executeScript(path.join(scriptsDir, 'CurrentUnixTimestampMs.js'), '');
  const timestampSec = parseInt(resultSec.result, 10);
  const timestampMs = parseInt(resultMs.result, 10);
  const ratio = timestampMs / timestampSec;
  assertTrue(ratio > 999 && ratio < 1001, `Ratio should be ~1000 but got ${ratio}`);
});

test('Timestamps - both generate current time', () => {
  const before = Date.now();
  const resultSec = executeScript(path.join(scriptsDir, 'CurrentUnixTimestamp.js'), '');
  const resultMs = executeScript(path.join(scriptsDir, 'CurrentUnixTimestampMs.js'), '');
  const after = Date.now();

  const timestampSec = parseInt(resultSec.result, 10) * 1000; // Convert to ms
  const timestampMs = parseInt(resultMs.result, 10);

  assertTrue(timestampSec >= before - 1000 && timestampSec <= after + 1000, 'Second timestamp should be current');
  assertTrue(timestampMs >= before && timestampMs <= after + 1000, 'Millisecond timestamp should be current');
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
