/**
 * Shared Test Utilities for Boop Scripts
 *
 * This module provides common testing infrastructure for all Boop script tests:
 * - MockScriptExecution: Simulates the Boop runtime environment
 * - executeScript: Loads and runs a script in a sandboxed context
 * - Test assertion helpers
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
 * Mock require() for Boop modules
 */
function createMockRequire(scriptDir) {
  return function mockRequire(modulePath) {
    // Handle @boop/ modules
    if (modulePath.startsWith('@boop/')) {
      const moduleName = modulePath.replace('@boop/', '');
      let libPath = path.join(__dirname, '../Boop/Boop/scripts/lib', moduleName);

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
 * Test assertion helpers
 */
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

function assertFalse(condition, message) {
  if (condition) {
    throw new Error(message || `Expected condition to be false`);
  }
}

function assertMatches(text, pattern, message) {
  if (!pattern.test(text)) {
    throw new Error(message || `Expected text to match pattern ${pattern} but got "${text}"`);
  }
}

module.exports = {
  colors,
  MockScriptExecution,
  loadScript,
  executeScript,
  createMockRequire,
  assertEqual,
  assertContains,
  assertNotNull,
  assertTrue,
  assertFalse,
  assertMatches,
};
