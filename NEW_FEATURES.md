# Boop - New Features & Enhancements

This document describes all the major improvements and new features added to Boop.

---

## 🎯 30+ New Modern Transformation Scripts

Added 30 cutting-edge transformation scripts for modern development workflows:

### AI & Machine Learning Tools
- **Token Counter** - Estimates token counts for GPT-4, Claude, and other AI models with cost calculations
- **Decode JWT Token** - Decodes and displays JWT token headers, payloads, and timestamps

### Modern Data Formats
- **Format TOML** - Formats and validates TOML configuration files
- **Format JSONL** - Formats JSON Lines (newline-delimited JSON)
- **Prettify JSONL** - Formats JSONL entries with indentation for readability
- **Format JSON-LD** - Formats and validates JSON-LD structured data for SEO

### API Developer Tools
- **Format GraphQL** - Formats GraphQL queries and schemas with proper indentation
- **cURL to Fetch** - Converts cURL commands to JavaScript fetch() code
- **HTTP Status Code Lookup** - Looks up HTTP status codes with descriptions and use cases

### Git & Version Control
- **Conventional Commit** - Formats git commits following Conventional Commits specification
- **Bump Semantic Version** - Increments semantic version numbers (major.minor.patch)
- **Generate Git Branch Name** - Converts text to clean git branch names following best practices

### Modern Web Development
- **Sort Tailwind Classes** - Sorts Tailwind CSS classes in recommended order
- **CSS Minify** - Minifies CSS by removing whitespace and optimizing
- **Slugify Text** - Converts text to URL-friendly slugs

### Code Utilities
- **Generate TypeScript Interface** - Generates TypeScript interfaces from JSON objects
- **Regex Escape** - Escapes special characters for use in regular expressions
- **Parse .env File** - Converts .env files to JSON or exports for various languages
- **Extract JSON** - Extracts and formats JSON from text (logs, code, markdown)

### Data Conversion & Formatting
- **Unix Timestamp Converter** - Bidirectional conversion between Unix timestamps and dates
- **IP Address Converter** - Converts IPv4 addresses to/from integer, hex, and binary
- **Hex Color Converter** - Converts hex colors to RGB, RGBA, HSL, and HSLA
- **Format Markdown Table** - Formats and aligns markdown tables for readability
- **Unicode Normalizer** - Normalizes Unicode text to NFC, NFD, NFKC, or NFKD form

### Generators
- **Generate UUID v7** - Generates time-ordered UUID v7 (newest standard with timestamp)
- **Generate Nano ID** - Generates URL-friendly unique IDs (alternative to UUID)
- **Lorem Ipsum (Advanced)** - Generates Lorem Ipsum with customizable paragraphs

### Text Processing
- **Remove ANSI Colors** - Strips ANSI color codes and escape sequences
- **PascalCase to Sentence** - Converts PascalCase/camelCase to readable sentences
- **SQL Formatter** - Formats SQL queries with proper indentation

---

## ⭐ Script Favorites & Recents System

### Features
- **Favorite Scripts**: Mark your most-used scripts as favorites for quick access
- **Recent Scripts**: Automatically tracks your last 10 used scripts
- **Smart Prioritization**: When the search field is empty, favorites and recents are shown first
- **Persistent Storage**: Favorites and recents are saved using UserDefaults

### Usage

#### Toggle Favorite
1. Open script picker (⌘B)
2. Select a script with arrow keys or Tab
3. Press **⌘F** to toggle favorite status
4. A ⭐ star appears next to favorited scripts

#### Access Favorites & Recents
1. Open script picker (⌘B)
2. Leave the search field empty
3. Favorites appear first, followed by recent scripts
4. Status bar shows: "⭐ Favorites & Recent Scripts (Cmd+F to favorite)"

### Technical Implementation
- `ScriptPreferences.swift`: Manages favorites and recents with persistence
- `Script.identifier`: Each script has a unique identifier based on filename
- `Script.isFavorite`: Computed property to check favorite status
- `ScriptManager.getFavoriteScripts()`: Returns all favorite scripts
- `ScriptManager.getRecentScripts()`: Returns recent scripts in order

---

## 🔄 Grouped Undo/Redo for Multi-Cursor

### The Problem
Previously, multi-cursor edit operations created separate undo entries for each cursor, making it tedious to undo complex edits.

### The Solution
All text replacements in a multi-cursor operation are now wrapped in a single undo group using `NSUndoManager.beginUndoGrouping()` and `endUndoGrouping()`.

### Benefits
- **Single Undo**: Press ⌘Z once to undo all cursors at once
- **Better UX**: Multi-cursor editing feels more natural and professional
- **Consistency**: Matches behavior of modern editors like VSCode and Sublime

### Technical Details
- Modified `ScriptManager.replaceText()` to group operations
- Works with both script execution and manual multi-cursor edits
- Preserves cursor positions correctly during undo/redo

---

## ⚡ Performance Improvements

### Large File Handling
**Feature**: Automatic detection and warning for large files (> 1MB)

**How it Works**:
- Before running a script, checks the text size in bytes
- If > 1MB, displays an info message: "Processing large file (X.X MB) - this may take a moment..."
- Helps users understand why some operations might be slow

### Implementation
- File size check in `ScriptManager.runScript()`
- Uses UTF-8 byte count for accurate size measurement
- Non-blocking - doesn't prevent script execution, just informs the user

### Future Improvements (Not Yet Implemented)
- Script execution timeout (complex due to JavaScriptCore's single-threaded model)
- Background processing for very large files
- Progress indicators for long-running operations

---

## 🎨 Enhanced User Experience

### Visual Improvements
1. **Favorite Indicator**: ⭐ star emoji prefix on favorited scripts
2. **Contextual Help**: Status bar shows keyboard shortcuts and tips
3. **File Size Warnings**: Info messages for large file processing

### Keyboard Shortcuts
- **⌘B**: Open script picker (existing)
- **⇧⌘B**: Repeat last script (existing)
- **⌘F**: Toggle favorite on selected script (NEW)
- **Tab**: Navigate scripts in picker (existing)
- **↵ Enter**: Run selected script (existing)
- **Esc**: Close script picker (existing)

### Better Error Messages
- Clear error messages for invalid inputs
- Timeout warnings (when implemented)
- File size notifications

---

## 📋 Script Examples

### Token Counter
```
Input: Your text content
Output:
Token Estimates:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GPT-4/Claude (conservative): ~250 tokens
...
```

### cURL to Fetch
```
Input: curl 'https://api.example.com/data' -H 'Authorization: Bearer token'
Output:
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer token'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Conventional Commit
```
Input: added login feature
Output: Guide with examples and types (feat, fix, docs, etc.)
```

### Sort Tailwind Classes
```
Input: text-white bg-blue-500 p-4 rounded flex items-center
Output: flex items-center p-4 bg-blue-500 rounded text-white
```

---

## 🏗️ Architecture Changes

### New Files
- `Boop/System/ScriptPreferences.swift` - Manages favorites and recents

### Modified Files
- `Boop/System/Models/Script.swift` - Added identifier, isFavorite, toggleFavorite()
- `Boop/System/ScriptManager.swift` - Added getFavoriteScripts(), getRecentScripts(), performance checks, grouped undo
- `Boop/Controllers/PopoverViewController.swift` - Favorites/recents display, Cmd+F shortcut
- `Boop/Controllers/ScriptsTableViewController.swift` - Star indicator for favorites

### New Scripts (30 files)
- `Boop/scripts/TokenCounter.js`
- `Boop/scripts/FormatTOML.js`
- `Boop/scripts/FormatJSONL.js`
- `Boop/scripts/PrettifyJSONL.js`
- `Boop/scripts/FormatGraphQL.js`
- `Boop/scripts/CurlToFetch.js`
- `Boop/scripts/ConventionalCommit.js`
- `Boop/scripts/SemanticVersion.js`
- `Boop/scripts/GitBranchName.js`
- `Boop/scripts/SortTailwindClasses.js`
- `Boop/scripts/UnixTimestamp.js`
- `Boop/scripts/GenerateUUIDv7.js`
- `Boop/scripts/HexColorConverter.js`
- `Boop/scripts/ExtractJSON.js`
- `Boop/scripts/GenerateNanoID.js`
- `Boop/scripts/RemoveANSI.js`
- `Boop/scripts/FormatMarkdownTable.js`
- `Boop/scripts/HTTPStatusCode.js`
- `Boop/scripts/RegexEscape.js`
- `Boop/scripts/ParseEnvFile.js`
- `Boop/scripts/IPAddressConverter.js`
- `Boop/scripts/JSONLDFormatter.js`
- `Boop/scripts/SlugifyText.js`
- `Boop/scripts/SQLFormatter.js`
- `Boop/scripts/UnicodeNormalizer.js`
- `Boop/scripts/PascalCaseToSentence.js`
- `Boop/scripts/DecodeJWT.js`
- `Boop/scripts/CSSMinify.js`
- `Boop/scripts/LoremIpsumAdvanced.js`
- `Boop/scripts/GenerateTypeScriptInterface.js`

---

## 🧪 Testing

### Manual Testing Checklist

#### Favorites & Recents
- [ ] Can favorite scripts with Cmd+F
- [ ] Star appears next to favorited scripts
- [ ] Favorites persist after app restart
- [ ] Recents update when running scripts
- [ ] Recents show in correct order (most recent first)
- [ ] Empty search shows favorites + recents

#### Grouped Undo
- [ ] Multi-cursor edit undoes in single operation
- [ ] Script execution on multiple selections undoes together
- [ ] Redo works correctly

#### Performance
- [ ] Large file warning appears for files > 1MB
- [ ] File size is calculated accurately
- [ ] Warning doesn't block script execution

#### New Scripts
- [ ] All 30 scripts load without errors
- [ ] Scripts execute correctly on test inputs
- [ ] Error handling works for invalid inputs
- [ ] Output format matches expected results

---

## 📝 Migration Notes

### Upgrading from Previous Version

1. **No Breaking Changes**: All existing features continue to work
2. **New Preferences**: Favorites and recents are stored in UserDefaults
3. **Performance**: Slightly slower initial search due to favorites/recents check
4. **Memory**: Minimal increase due to ScriptPreferences singleton

### Compatibility
- **macOS**: 10.12+ (same as before)
- **Swift**: 5+ (same as before)
- **Xcode**: 11+ recommended

---

## 🚀 Future Enhancements (Not Implemented)

These were considered but not implemented in this release:

### Power User Features
- [ ] Custom keyboard shortcuts for favorite scripts
- [ ] Script chaining/macro system
- [ ] Script categories/tags in UI

### Theming
- [ ] Dark/light mode themes
- [ ] Custom color schemes
- [ ] Font size and family controls

### Performance
- [ ] Script execution timeouts
- [ ] Background processing for large files
- [ ] Progress indicators

### Advanced Features
- [ ] Plugin system for native Swift extensions
- [ ] iCloud sync for favorites/recents
- [ ] iOS/iPadOS version
- [ ] Script marketplace

---

## 🙏 Credits

These enhancements were developed to take Boop to the next level, building on the excellent foundation created by Ivan Mathy and the Boop community.

**New Features Developed**: November 2025
**Original Boop**: Created by Ivan Mathy (IvanMathy/Boop)

---

## 📞 Support

If you encounter issues with the new features:

1. Check the Xcode console for error messages
2. Verify ScriptPreferences.swift is included in the project
3. Clear UserDefaults for a fresh start: `defaults delete com.yourcompany.Boop`
4. Report issues on GitHub with detailed reproduction steps

---

## 📄 License

All new code follows the same license as the original Boop project (MIT License).
