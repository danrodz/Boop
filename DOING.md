# DOING.md

This document, inspired by [this tweet](https://twitter.com/drwave/status/1564063331341590529), contains the currently in progress or planned features for Boop.

This document was last updated *<u>November 18th, 2025</u>*. Work may be happening in other repositories or branches making this one appear stale, but Boop is still very much an active project.

## Recently Completed

### Multi Cursor Editing ✅

The ability to have more than one active cursor to type and edit content.

**Status:** Fully implemented with IntelliJ-style features:
- Cmd+Click to add cursors
- Cmd+G to select next occurrence
- Cmd+Ctrl+G to select all occurrences
- Visual cursor rendering with blinking animation
- Synchronized editing across multiple cursors

**Known Limitations:**
- Undo/redo doesn't group multi-cursor edits
- Cut/copy only works on last cursor (improvement planned)

### String Manipulation Scripts ✅

Comprehensive string manipulation features similar to IntelliJ's StringManipulation plugin.

**Added 79 new scripts:**
- Case conversions (PascalCase, SCREAMING_SNAKE_CASE, dot.case, path/case, toggles)
- Escape/unescape for Java, JavaScript, C#, JSON, XML, SQL, PHP
- Advanced sorting (by length, hex, numeric, reverse)
- Text alignment (left/center/right, column alignment)
- Increment/decrement operations
- Filtering and grep operations
- Text manipulation (swap, wrap, quotes, path separators)

## In Progress

### Test Coverage Expansion

Expanding automated test coverage from ~7 scripts to comprehensive coverage.

**Current Status:**
- 185 tests passing (100% pass rate)
- Added tests for new string manipulation scripts
- Need tests for ~220+ additional scripts

### Script Organization

Improving discoverability of 300+ scripts through categorization and grouping.

## Planned

### Color Settings

The ability to customize colors beyond light and dark mode. Maybe themes?

### Font Settings

The ability to change font, and more importantly font-size.

### Localization (i18n)

Making Boop available in multiple languages.

**Scope:**
- UI string extraction and localization framework
- Script name/description localization
- RTL language support

### Script Repository

Separating scripts from the main Boop Github repository, into a dedicated one.

**Benefits:**
- Easier community contributions
- Version management for scripts
- Update notifications

## Not Planned

### Load / Save

There is no plan to support files within Boop.

### Tabs

There is no plan to support tabs or multiple windows within Boop.