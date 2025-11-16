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
            var ranges = textView.selectedRanges as! [NSRange]
            ranges.append(range)
            textView.selectedRanges = ranges as [NSValue]
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
        return cursorPositions.map { NSRange(location: $0, length: 0) }
    }
}
