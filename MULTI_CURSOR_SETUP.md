# Multi-Cursor Editing Feature

This document describes the multi-cursor editing implementation for Boop, similar to JetBrains IDEs.

## Features Implemented

### Core Functionality
- **Multiple cursor support**: Place multiple cursors in the editor and type/edit simultaneously
- **Visual cursor rendering**: Custom overlay view displays all active cursors with blinking animation
- **Synchronized editing**: All text operations apply to all cursor positions

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd + Click` | Add cursor at clicked position |
| `Cmd + D` | Add cursor at next occurrence of selected text |
| `Cmd + Shift + L` | Add cursors at all occurrences of selected text |
| `Esc` | Clear all cursors (return to single cursor mode) |

### Files Added

1. **MultiCursorManager.swift** (`Boop/Boop/Editor/`)
   - Manages cursor positions and state
   - Handles adding/removing cursors
   - Provides methods for finding next/all occurrences

2. **MultiCursorOverlayView.swift** (`Boop/Boop/Editor/`)
   - Custom NSView for rendering multiple cursors
   - Implements cursor blinking animation
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

### Adding Cursors

1. **Cmd + Click**: Click at different positions while holding Cmd to add multiple cursors
2. **Cmd + D**: Select text, then press Cmd+D to add a cursor at the next occurrence
3. **Cmd + Shift + L**: Select text, then press Cmd+Shift+L to add cursors at all occurrences

### Editing with Multiple Cursors

Once multiple cursors are active:
- Type normally - text appears at all cursor positions
- Use arrow keys - all cursors move together
- Copy/paste - operations apply to all cursors
- Run scripts - scripts execute on all selected ranges

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

1. Build and run the app
2. Type some text
3. Try Cmd+Click to add cursors
4. Type and verify text appears at all cursor positions
5. Select a word and press Cmd+D to find next occurrence
6. Press Esc to clear cursors

## Compatibility

- **Platform**: macOS 10.12+
- **Language**: Swift 5+
- **Dependencies**: SavannaKit (already included)

## Known Limitations

- Multi-cursor overlay may need refinement for edge cases (scrolling, line wrapping)
- The cursor blinking is independent from NSTextView's native cursor
- Some advanced text operations may not fully support multi-cursor yet

## Future Enhancements

- [ ] Column/block selection mode
- [ ] Undo/redo support for multi-cursor operations
- [ ] Per-cursor clipboard history
- [ ] Skip to next occurrence without creating cursor
- [ ] More granular cursor manipulation (Alt+Up/Down to add cursors vertically)
