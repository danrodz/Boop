# Boop Scripts Test Results

## JavaScript Test Suite

This repository includes a Node.js-based test runner that validates the 25 community scripts incorporated into Boop's built-in scripts collection.

### Running Tests

```bash
node test-runner.js
```

### Requirements

- Node.js (v12 or higher)
- No additional dependencies required

### Test Coverage

The test suite includes **42 test cases** covering all 25 incorporated scripts:

#### Text Manipulation Scripts (9 tests)
- ✅ JoinLines - joins lines without delimiter
- ✅ JoinLinesWithComma - joins lines with commas
- ✅ JoinLinesWithSpace - joins lines with spaces
- ✅ TrimStart - trims leading whitespace
- ✅ TrimEnd - trims trailing whitespace
- ✅ ShuffleCharacters - shuffles all characters
- ✅ Wadsworth - removes first 30% of words
- ✅ LineComparer - checks if all lines are equal
- ✅ LineComparer - detects different lines

#### Data Conversion Scripts (13 tests)
- ✅ CSVtoJSONheaderless - converts CSV to JSON array
- ✅ DIGI2ASCII - converts decimal codes to ASCII (space-separated)
- ✅ DIGI2ASCII - converts decimal codes to ASCII (comma-separated)
- ✅ FromUnicode - converts Unicode escaped to text
- ✅ ToUnicode - converts text to Unicode escaped format
- ✅ JsObjectToJSON - converts JS object to JSON
- ✅ TimeToSecond - converts hh:mm:ss to seconds
- ✅ TimeToSecond - handles mm:ss format (treated as hh:mm)
- ✅ rgb2hex - converts RGB to hex
- ✅ jsToPhp - converts JS object to PHP array (2 tests)
- ✅ WktToWkb - converts WKT to WKB hex (2 tests)
- ✅ WkbToWkt - converts WKB hex to WKT (2 tests)

#### Formatting & Generation Scripts (10 tests)
- ✅ ConvertToMarkdownTable - converts CSV to markdown table
- ✅ ListToHTMLList - converts comma list to HTML
- ✅ ListToHTMLList - converts HTML back to comma list
- ✅ GenerateHashtag - creates hashtag from text
- ✅ GenerateHashtag - removes special characters
- ✅ NewBoopScript - generates script template
- ✅ CreateProjectGlossaryMarkdown - generates glossary templates (4 tests)

#### Code Utilities Scripts (4 tests)
- ✅ ToggleCamelHyphen - converts hyphen to camel
- ✅ ToggleCamelHyphen - converts camel to hyphen
- ✅ ContrastingColor - determines contrast for white
- ✅ ContrastingColor - handles short hex format

#### Edge Cases (4 tests)
- ✅ JoinLines - handles empty input
- ✅ JoinLines - handles single line
- ✅ TrimStart - handles already trimmed text
- ✅ GenerateHashtag - handles empty input gracefully

### Test Results

**Latest Run:** All 42 tests passing ✅

```
Total Tests: 42
Passed: 42
Failed: 0
Success Rate: 100%
```

**Coverage:** 25/25 scripts tested (100%)

### Test Implementation

The test suite:
- **Mocks the Boop environment** (ScriptExecution object with `text`, `fullText`, `selection`, `insert()`, `postError()`, `postInfo()`)
- **Executes actual JavaScript code** from the scripts using Node.js `vm` module
- **Validates outputs** against expected results
- **Tests edge cases** (empty input, special characters, multiple formats)

### Complete Coverage

All 25 community scripts now have automated JavaScript tests covering:
- Basic functionality for each script
- Multiple input variations
- Edge cases and error handling
- Different data formats (where applicable)

### Script Issues Documented

1. **FromUnicode.js** - Produces leading null character (known bug)
2. **rgb2hex.js** - Hex padding for values < 16 (known bug)
3. **TimeToSecond.js** - Only handles hh:mm:ss format (treats "2:30" as 2h30m, not 2m30s)
4. **JoinLines.js** - Duplicates functionality of existing Collapse.js

### Running Full Xcode Tests

For comprehensive testing including Swift integration:

1. Open project in Xcode
2. Add `CommunityScriptsTests.swift` to BoopTests target
3. Run tests: `⌘U` or `Product → Test`

### Contributing

When adding new scripts, please:
1. Add corresponding test case to `test-runner.js`
2. Run `node test-runner.js` to verify
3. Update this document with new test count
