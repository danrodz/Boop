#!/usr/bin/env node

/**
 * JavaScript Test Runner for Boop Scripts
 *
 * This test suite executes Boop scripts directly using Node.js,
 * without requiring Xcode or the full macOS app environment.
 *
 * It automatically discovers and runs all *.test.js files in the __tests__ directory.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
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
let currentSuite = null;
let testsInCurrentSuite = 0;
let passedInCurrentSuite = 0;

/**
 * Test suite grouping
 */
function describe(name, fn) {
  currentSuite = name;
  testsInCurrentSuite = 0;
  passedInCurrentSuite = 0;

  console.log(`\n${colors.bright}${colors.cyan}${name}${colors.reset}`);

  fn();

  // Print suite summary
  const failedInSuite = testsInCurrentSuite - passedInCurrentSuite;
  if (failedInSuite === 0) {
    console.log(`${colors.dim}  ${passedInCurrentSuite}/${testsInCurrentSuite} tests passed${colors.reset}`);
  }

  currentSuite = null;
}

/**
 * Individual test case
 */
function test(name, fn) {
  totalTests++;
  testsInCurrentSuite++;

  try {
    fn();
    passedTests++;
    passedInCurrentSuite++;
    console.log(`  ${colors.green}✓${colors.reset} ${name}`);
  } catch (error) {
    failedTests++;
    failures.push({
      suite: currentSuite,
      name,
      error: error.message,
      stack: error.stack
    });
    console.log(`  ${colors.red}✗${colors.reset} ${name}`);
    console.log(`    ${colors.red}${error.message}${colors.reset}`);
  }
}

/**
 * Find all test files in __tests__ directory
 */
function findTestFiles(dir) {
  const testFiles = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      testFiles.push(...findTestFiles(filePath));
    } else if (file.endsWith('.test.js')) {
      testFiles.push(filePath);
    }
  }

  return testFiles.sort(); // Sort for consistent order
}

/**
 * Run a test file
 */
function runTestFile(testFilePath) {
  // Make describe and test functions globally available
  global.describe = describe;
  global.test = test;

  try {
    // Clear the require cache to ensure fresh load
    delete require.cache[require.resolve(testFilePath)];

    // Load and execute the test file
    require(testFilePath);
  } catch (error) {
    console.error(`${colors.red}Error loading test file ${testFilePath}:${colors.reset}`);
    console.error(error);
    failedTests++;
    failures.push({
      suite: path.basename(testFilePath),
      name: 'File Load Error',
      error: error.message,
      stack: error.stack,
    });
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

console.log(`${colors.bright}${colors.cyan}Boop Scripts Test Suite${colors.reset}`);
console.log(`${colors.dim}Discovering test files...${colors.reset}\n`);

const testsDir = path.join(__dirname, '__tests__');

// Check if __tests__ directory exists
if (!fs.existsSync(testsDir)) {
  console.error(`${colors.red}Error: __tests__ directory not found at ${testsDir}${colors.reset}`);
  process.exit(1);
}

// Find all test files
const testFiles = findTestFiles(testsDir);

if (testFiles.length === 0) {
  console.error(`${colors.yellow}Warning: No test files found in ${testsDir}${colors.reset}`);
  process.exit(0);
}

console.log(`${colors.dim}Found ${testFiles.length} test file(s)${colors.reset}`);

// Run all test files
for (const testFile of testFiles) {
  runTestFile(testFile);
}

// ============================================================================
// TEST RESULTS SUMMARY
// ============================================================================

console.log(`\n${colors.bright}${'='.repeat(60)}${colors.reset}`);
console.log(`${colors.bright}Test Results${colors.reset}\n`);

console.log(`Total Tests: ${totalTests}`);
console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);

const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0;
console.log(`Pass Rate: ${passRate}%`);

if (failedTests > 0) {
  console.log(`\n${colors.bright}${colors.red}Failed Tests:${colors.reset}\n`);
  failures.forEach(({ suite, name, error }) => {
    console.log(`  ${colors.red}✗${colors.reset} ${suite} > ${name}`);
    console.log(`    ${error}\n`);
  });
}

console.log(`${colors.bright}${'='.repeat(60)}${colors.reset}\n`);

// Exit with appropriate code
process.exit(failedTests > 0 ? 1 : 0);
