//
//  MultiCursorManager.swift
//  Boop
//
//  Multi-cursor editing manager for handling multiple insertion points
//  and synchronized editing operations.
//

import Cocoa

class MultiCursorManager {

    // MARK: - Properties

    /// All cursor positions (as NSRange with length 0 for insertion points)
    private(set) var cursorPositions: [Int] = []

    /// Whether multi-cursor mode is active
    private(set) var isMultiCursorActive: Bool = false

    /// Weak reference to the text view being managed
    weak var textView: NSTextView?

    // MARK: - Initialization

    init(textView: NSTextView) {
        self.textView = textView
    }

    // MARK: - Cursor Management

    /// Add a cursor at the specified position
    func addCursor(at position: Int) {
        guard let textView = textView else { return }
        guard position >= 0 && position <= textView.string.count else { return }

        // Don't add duplicate cursors
        guard !cursorPositions.contains(position) else { return }

        cursorPositions.append(position)
        cursorPositions.sort()
        isMultiCursorActive = true
        updateTextViewSelections()
    }

    /// Remove a cursor at the specified position
    func removeCursor(at position: Int) {
        cursorPositions.removeAll { $0 == position }

        if cursorPositions.count <= 1 {
            isMultiCursorActive = false
        }

        updateTextViewSelections()
    }

    /// Clear all cursors and return to single cursor mode
    func clearAllCursors() {
        cursorPositions.removeAll()
        isMultiCursorActive = false
        updateTextViewSelections()
    }

    /// Add cursor at next occurrence of selected text
    func addCursorAtNextOccurrence() {
        guard let textView = textView else { return }
        guard let currentRange = textView.selectedRanges.first as? NSRange else { return }
        guard currentRange.length > 0 else { return }

        let selectedText = (textView.string as NSString).substring(with: currentRange)
        let searchRange = NSRange(location: currentRange.upperBound, length: textView.string.count - currentRange.upperBound)

        if let range = (textView.string as NSString).range(of: selectedText, options: [], range: searchRange), range.location != NSNotFound {
            // Add current position if not already in multi-cursor mode
            if !isMultiCursorActive {
                cursorPositions.append(currentRange.location)
            }

            addCursor(at: range.location)

            // Update selections to include the new range
            guard let ranges = textView.selectedRanges as? [NSRange] else { return }
            var updatedRanges = ranges
            updatedRanges.append(range)
            textView.selectedRanges = updatedRanges as [NSValue]
        }
    }

    /// Select next occurrence of selected text (like IntelliJ's Alt+J / Cmd+G)
    /// This maintains selections (not just cursors) and allows progressive selection of matching text
    func selectNextOccurrence() {
        guard let textView = textView else { return }

        guard let currentRanges = textView.selectedRanges as? [NSRange],
              let lastRange = currentRanges.last, lastRange.length > 0 else { return }

        let selectedText = (textView.string as NSString).substring(with: lastRange)
        let searchStart = lastRange.upperBound
        let searchRange = NSRange(location: searchStart, length: textView.string.count - searchStart)

        if let foundRange = (textView.string as NSString).range(of: selectedText, options: [], range: searchRange),
           foundRange.location != NSNotFound {

            // Add the new selection to existing selections
            var newRanges = currentRanges
            newRanges.append(foundRange)
            textView.selectedRanges = newRanges as [NSValue]

            // Update cursor positions to track all selections
            cursorPositions = newRanges.map { $0.location }
            isMultiCursorActive = newRanges.count > 1

            // Scroll to show the newly selected range
            textView.scrollRangeToVisible(foundRange)
        }
    }

    /// Select all occurrences of currently selected text (like IntelliJ's Cmd+Ctrl+G)
    func selectAllOccurrences() {
        guard let textView = textView else { return }
        guard let currentRange = textView.selectedRanges.first as? NSRange else { return }
        guard currentRange.length > 0 else { return }

        let selectedText = (textView.string as NSString).substring(with: currentRange)
        let fullText = textView.string as NSString

        var foundRanges: [NSRange] = []
        var searchRange = NSRange(location: 0, length: fullText.length)

        while searchRange.location < fullText.length {
            let range = fullText.range(of: selectedText, options: [], range: searchRange)

            if range.location == NSNotFound {
                break
            }

            foundRanges.append(range)
            searchRange.location = range.upperBound
            searchRange.length = fullText.length - searchRange.location
        }

        if foundRanges.count > 1 {
            textView.selectedRanges = foundRanges as [NSValue]
            cursorPositions = foundRanges.map { $0.location }
            isMultiCursorActive = true
        }
    }

    /// Add cursors at all occurrences of selected text
    func addCursorsAtAllOccurrences() {
        guard let textView = textView else { return }
        guard let currentRange = textView.selectedRanges.first as? NSRange else { return }
        guard currentRange.length > 0 else { return }

        let selectedText = (textView.string as NSString).substring(with: currentRange)
        let fullText = textView.string as NSString

        cursorPositions.removeAll()
        var searchRange = NSRange(location: 0, length: fullText.length)

        while searchRange.location < fullText.length {
            let range = fullText.range(of: selectedText, options: [], range: searchRange)

            if range.location == NSNotFound {
                break
            }

            cursorPositions.append(range.location)
            searchRange.location = range.upperBound
            searchRange.length = fullText.length - searchRange.location
        }

        if cursorPositions.count > 1 {
            isMultiCursorActive = true
            updateTextViewSelections()
        }
    }

    /// Update the text view's selected ranges based on cursor positions
    private func updateTextViewSelections() {
        guard let textView = textView else { return }

        if isMultiCursorActive && !cursorPositions.isEmpty {
            let ranges = cursorPositions.map { NSRange(location: $0, length: 0) }
            textView.selectedRanges = ranges as [NSValue]
        } else if let firstPosition = cursorPositions.first {
            textView.selectedRange = NSRange(location: firstPosition, length: 0)
        }
    }

    /// Synchronize cursor positions after text changes
    func synchronizeAfterTextChange(in range: NSRange, changeInLength delta: Int) {
        cursorPositions = cursorPositions.map { position in
            if position > range.location {
                return max(range.location, position + delta)
            }
            return position
        }

        // Remove duplicates
        cursorPositions = Array(Set(cursorPositions)).sorted()
    }

    /// Get all cursor positions as NSRange array
    func getCursorRanges() -> [NSRange] {
        guard let textView = textView else {
            return cursorPositions.map { NSRange(location: $0, length: 0) }
        }

        // If we have actual selections with length, return those
        // Otherwise return insertion points
        guard let selectedRanges = textView.selectedRanges as? [NSRange] else {
            return cursorPositions.map { NSRange(location: $0, length: 0) }
        }

        if selectedRanges.count > 1 || (selectedRanges.first?.length ?? 0) > 0 {
            return selectedRanges
        }

        return cursorPositions.map { NSRange(location: $0, length: 0) }
    }

    /// Update cursor positions from current text view selections
    func updateFromTextViewSelections() {
        guard let textView = textView else { return }
        guard let ranges = textView.selectedRanges as? [NSRange] else { return }

        if ranges.count > 1 {
            cursorPositions = ranges.map { $0.location }
            isMultiCursorActive = true
        } else if ranges.count == 1 && ranges[0].length == 0 {
            cursorPositions = [ranges[0].location]
            isMultiCursorActive = false
        }
    }
}
