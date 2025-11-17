# Multi-Cursor Editing Feature

This document describes the multi-cursor editing implementation for Boop, similar to JetBrains IDEs.

## Features Implemented

### Core Functionality
- **Multiple cursor support**: Place multiple cursors in the editor and type/edit simultaneously
- **Visual cursor rendering**: Custom overlay view displays all active cursors with blinking animation
- **Synchronized editing**: All text operations apply to all cursor positions

### Keyboard Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Cmd + Click` | Add cursor at clicked position | Place multiple cursors manually |
| `Cmd + G` | **Select next occurrence** | Select next occurrence of selected text (like IntelliJ's Alt+J) |
| `Cmd + Ctrl + G` | **Select all occurrences** | Select all occurrences of selected text (like IntelliJ's Cmd+Ctrl+G) |
| `Cmd + D` | Add cursor at next occurrence | Add insertion point at next occurrence |
| `Cmd + Shift + L` | Add cursors at all occurrences | Add insertion points at all occurrences |
| `Esc` | Clear all cursors | Return to single cursor mode |

### Files Added

1. **MultiCursorManager.swift** (`Boop/Boop/Editor/`)
   - Manages cursor positions and state
   - Handles adding/removing cursors
   - Provides methods for finding next/all occurrences
   - **New methods:**
     - `selectNextOccurrence()` - Select next occurrence (maintains selections)
     - `selectAllOccurrences()` - Select all occurrences at once
     - `addCursorAtNextOccurrence()` - Add cursor at next occurrence
     - `addCursorsAtAllOccurrences()` - Add cursors at all occurrences

2. **MultiCursorOverlayView.swift** (`Boop/Boop/Editor/`)
   - Custom NSView for rendering multiple cursors
   - Implements cursor blinking animation synchronized with NSTextView
   - Observes scroll events for proper cursor positioning during scrolling
   - Hides native cursor when multi-cursor is active
   - Optimizes drawing by only rendering visible cursors
   - Handles line wrapping and coordinate conversion edge cases
   - Transparent to mouse events (pass-through)

3. **MainViewController.swift** (modified)
   - Integrated multi-cursor manager
   - Added keyboard shortcuts handling
   - Setup overlay view

## Setup Instructions

### 1. Add Files to Xcode Project

The following files need to be added to the Xcode project:

```
Boop/Boop/Editor/MultiCursorManager.swift
Boop/Boop/Editor/MultiCursorOverlayView.swift
```

**Steps:**
1. Open `Boop.xcodeproj` in Xcode
2. Right-click on the `Editor` group in the Project Navigator
3. Select "Add Files to 'Boop'..."
4. Navigate to and select both new Swift files
5. Ensure "Copy items if needed" is unchecked (files are already in place)
6. Ensure "Add to targets: Boop" is checked
7. Click "Add"

### 2. Optional: Add Menu Items

To add menu items for multi-cursor operations:

1. Open `MainMenu.xib` in Interface Builder
2. Locate the "Edit" menu
3. Add new menu items:
   - **Select Next Occurrence** (⌘G)
     - Action: `selectNextOccurrence:`
     - Target: First Responder
   - **Select All Occurrences** (⌘^G)
     - Action: `selectAllOccurrences:`
     - Target: First Responder
   - **---** (Separator)
   - **Add Cursor at Next Occurrence** (⌘D)
     - Action: `addCursorAtNextOccurrence:`
     - Target: First Responder
   - **Add Cursors at All Occurrences** (⌘⇧L)
     - Action: `addCursorsAtAllOccurrences:`
     - Target: First Responder
   - **Clear All Cursors** (Esc)
     - Action: `clearAllCursors:`
     - Target: First Responder

## Usage

### Select Next Occurrence (IntelliJ-style)

The **recommended workflow** for multi-selection editing:

1. **Select text**: Double-click a word or select any text
2. **Cmd+G repeatedly**: Each press selects the next occurrence of that text
   - All occurrences remain selected (highlighted)
   - You can type to replace all selected occurrences at once
   - Press Cmd+G again to add more occurrences
3. **Cmd+Ctrl+G**: Select ALL occurrences at once
4. **Esc**: Clear selections and return to single cursor

**Example workflow:**
```
1. Double-click "foo" → "foo" is selected
2. Press Cmd+G → Next "foo" is also selected (2 selections)
3. Press Cmd+G → Next "foo" is also selected (3 selections)
4. Type "bar" → All three "foo" instances are replaced with "bar"
```

### Adding Multiple Cursors

Alternative workflow for placing cursors (insertion points) without selections:

1. **Cmd + Click**: Click at different positions while holding Cmd to add multiple cursors
2. **Cmd + D**: Select text, then press Cmd+D to add a cursor at the next occurrence
3. **Cmd + Shift + L**: Select text, then press Cmd+Shift+L to add cursors at all occurrences

### Editing with Multiple Cursors/Selections

Once multiple cursors or selections are active:
- Type normally - text appears at all cursor positions or replaces all selections
- Use arrow keys - all cursors move together
- Copy/paste - operations apply to all cursors
- Run scripts - scripts execute on all selected ranges
- Delete/backspace - removes characters at all cursor positions

### Clearing Cursors

Press `Esc` to return to single cursor mode.

## Implementation Details

### How It Works

1. **NSTextView Multiple Selections**: The underlying NSTextView already supports `selectedRanges` (array of NSRange)
2. **MultiCursorManager**: Tracks cursor positions and synchronizes with NSTextView's selectedRanges
3. **Visual Overlay**: Since NSTextView only displays one cursor, MultiCursorOverlayView renders additional cursors
4. **Script Integration**: The existing ScriptManager already handles multiple ranges (line 148 in ScriptManager.swift)

### Architecture

```
MainViewController
├── SyntaxTextView (SavannaKit)
│   └── NSTextView (contentTextView)
│       └── selectedRanges: [NSRange]
├── MultiCursorManager
│   └── Manages cursor positions
└── MultiCursorOverlayView
    └── Renders visual cursors
```

## Testing

### Test Select Next Occurrence (Recommended)

1. Build and run the app
2. Type some text with repeated words: `hello world hello there hello again`
3. Double-click the first "hello" to select it
4. Press **Cmd+G** - the next "hello" should also become selected
5. Press **Cmd+G** again - the third "hello" should also become selected
6. Type "goodbye" - all three "hello" instances should be replaced with "goodbye"
7. Press Esc to clear selections

### Test Select All Occurrences

1. Type text with repeated words
2. Select one instance
3. Press **Cmd+Ctrl+G** - all instances should be selected at once
4. Type to replace all at once

### Test Multi-Cursor Mode

1. Type some text
2. Try **Cmd+Click** to add cursors at different positions
3. Type and verify text appears at all cursor positions
4. Select a word and press **Cmd+D** to add cursor at next occurrence
5. Press Esc to clear cursors

## Compatibility

- **Platform**: macOS 10.12+
- **Language**: Swift 5+
- **Dependencies**: SavannaKit (already included)

## Improvements & Optimizations

### Cursor Rendering
- ✅ **Scroll handling**: Overlay updates automatically when scrolling
- ✅ **Line wrapping support**: Properly handles wrapped lines and line endings
- ✅ **Visible rect optimization**: Only draws cursors in visible area for performance
- ✅ **Coordinate conversion**: Robust conversion between text view and overlay coordinates

### Cursor Blinking
- ✅ **Synchronized blinking**: Matches NSTextView's blink rate (0.53s)
- ✅ **Native cursor hiding**: Hides native cursor when multi-cursor is active
- ✅ **Blink reset on typing**: Cursor visibility resets when user types or changes selection
- ✅ **Proper cleanup**: Removes observers and timers on dealloc

### Text Operations
- ✅ **Selection tracking**: Automatically syncs with NSTextView's selectedRanges
- ✅ **Multi-selection support**: Handles both cursors (insertion points) and selections (ranges with length)
- ✅ **Script integration**: Works seamlessly with existing ScriptManager
- ✅ **Text change handling**: Updates cursor positions after insertions/deletions

## Known Limitations

- Column/block selection mode not yet implemented
- Some advanced editing features (like rectangular selection) may need additional work
- Performance with extremely large files (>1MB) not extensively tested

## Future Enhancements

- [ ] Column/block selection mode
- [ ] Undo/redo support for multi-cursor operations
- [ ] Per-cursor clipboard history
- [ ] Skip to next occurrence without creating cursor
- [ ] More granular cursor manipulation (Alt+Up/Down to add cursors vertically)
