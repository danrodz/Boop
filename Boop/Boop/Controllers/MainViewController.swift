//
//  MainViewController.swift
//  Boop
//
//  Created by Ivan on 1/26/19.
//  Copyright © 2019 OKatBest. All rights reserved.
//

import Cocoa
import SavannaKit

class MainViewController: NSViewController {

    @IBOutlet weak var editorView: SyntaxTextView!
    @IBOutlet weak var updateBuddy: UpdateBuddy!
    @IBOutlet weak var checkUpdateMenuItem: NSMenuItem!

    // Multi-cursor support
    private var multiCursorManager: MultiCursorManager?
    private var multiCursorOverlay: MultiCursorOverlayView?

    override func viewDidLoad() {
        super.viewDidLoad()

        #if APPSTORE

        checkUpdateMenuItem.isHidden = true

        #endif

        editorView.delegate = self

        editorView.contentTextView.selectedTextAttributes = [.backgroundColor:NSColor(red:0.19, green:0.44, blue:0.71, alpha:1.0), .foregroundColor: NSColor.white]

        setupMultiCursorSupport()

    }

    // MARK: - Multi-Cursor Setup

    private func setupMultiCursorSupport() {
        let textView = editorView.contentTextView
        multiCursorManager = MultiCursorManager(textView: textView)

        // Create overlay view for multi-cursor rendering
        // Position it to exactly cover the text view
        if let scrollView = editorView.enclosingScrollView {
            multiCursorOverlay = MultiCursorOverlayView(frame: scrollView.documentVisibleRect)
            multiCursorOverlay?.textView = textView
            multiCursorOverlay?.autoresizingMask = [.width, .height]

            if let overlay = multiCursorOverlay {
                // Add as subview of the clip view for proper scrolling
                scrollView.contentView.addSubview(overlay, positioned: .above, relativeTo: editorView)
            }
        } else {
            // Fallback: add directly to editor view
            multiCursorOverlay = MultiCursorOverlayView(frame: editorView.bounds)
            multiCursorOverlay?.textView = textView
            multiCursorOverlay?.autoresizingMask = [.width, .height]

            if let overlay = multiCursorOverlay {
                editorView.addSubview(overlay)
            }
        }

        // Add click gesture recognizer for Cmd+Click
        let clickGesture = NSClickGestureRecognizer(target: self, action: #selector(handleClick(_:)))
        editorView.addGestureRecognizer(clickGesture)
    }

    // MARK: - Multi-Cursor Actions

    @objc private func handleClick(_ gesture: NSClickGestureRecognizer) {
        guard let event = NSApp.currentEvent,
              event.modifierFlags.contains(.command) else { return }

        let point = gesture.location(in: editorView)
        let textView = editorView.contentTextView

        // Convert point to text position
        var convertedPoint = editorView.convert(point, to: textView)
        convertedPoint.x -= textView.textContainerOrigin.x
        convertedPoint.y -= textView.textContainerOrigin.y

        guard let layoutManager = textView.layoutManager,
              let textContainer = textView.textContainer else { return }

        let characterIndex = layoutManager.characterIndex(for: convertedPoint,
                                                          in: textContainer,
                                                          fractionOfDistanceBetweenInsertionPoints: nil)

        multiCursorManager?.addCursor(at: characterIndex)
        updateMultiCursorOverlay()
    }

    @IBAction func addCursorAtNextOccurrence(_ sender: Any) {
        multiCursorManager?.addCursorAtNextOccurrence()
        updateMultiCursorOverlay()
    }

    @IBAction func addCursorsAtAllOccurrences(_ sender: Any) {
        multiCursorManager?.addCursorsAtAllOccurrences()
        updateMultiCursorOverlay()
    }

    @IBAction func selectNextOccurrence(_ sender: Any) {
        multiCursorManager?.selectNextOccurrence()
        updateMultiCursorOverlay()
    }

    @IBAction func selectAllOccurrences(_ sender: Any) {
        multiCursorManager?.selectAllOccurrences()
        updateMultiCursorOverlay()
    }

    @IBAction func clearAllCursors(_ sender: Any) {
        multiCursorManager?.clearAllCursors()
        updateMultiCursorOverlay()
    }

    private func updateMultiCursorOverlay() {
        guard let manager = multiCursorManager else { return }
        let positions = manager.isMultiCursorActive ? manager.getCursorRanges().map { $0.location } : []
        multiCursorOverlay?.cursorPositions = positions

        // Update overlay frame to match text view bounds
        if let scrollView = editorView.enclosingScrollView {
            multiCursorOverlay?.frame = scrollView.documentVisibleRect
        } else {
            multiCursorOverlay?.frame = editorView.bounds
        }
    }

    private func resetCursorBlinking() {
        multiCursorOverlay?.resetBlinking()
    }
    @IBAction func openHelp(_ sender: Any) {
        open(url: "https://boop.okat.best/docs/")
    }
    
    
    @IBAction func openScripts(_ sender: Any) {
        open(url: "https://boop.okat.best/scripts/")
    }
    
    
    func open(url: String) {
        guard let url = URL(string: url) else {
            assertionFailure("Could not generate help URL.")
            return
        }
        NSWorkspace.shared.open(url)
    }
    
    @IBAction func clear(_ sender: Any) {
        let textView = editorView.contentTextView
        textView.textStorage?.beginEditing()
        
        let range = NSRange(location: 0, length: textView.textStorage?.length ?? textView.string.count)
        
        guard textView.shouldChangeText(in: range, replacementString: "") else {
            return
        }
        
        textView.textStorage?.replaceCharacters(in: range, with: "")
        
        textView.textStorage?.endEditing()
        textView.didChangeText()
    }
    
    
    @IBAction func checkForUpdates(_ sender: Any) {
        updateBuddy.check()
    }

    // MARK: - Keyboard Shortcuts

    override func keyDown(with event: NSEvent) {
        // Handle keyboard shortcuts for multi-cursor operations
        let flags = event.modifierFlags.intersection(.deviceIndependentFlagsMask)

        // Cmd+G: Select next occurrence (like IntelliJ's Alt+J)
        if event.charactersIgnoringModifiers == "g" && flags == .command {
            selectNextOccurrence(self)
            return
        }

        // Cmd+Ctrl+G: Select all occurrences (like IntelliJ's Cmd+Ctrl+G)
        if event.charactersIgnoringModifiers == "g" && flags.contains([.command, .control]) {
            selectAllOccurrences(self)
            return
        }

        // Cmd+D: Add cursor at next occurrence
        if event.charactersIgnoringModifiers == "d" && flags.contains(.command) && !flags.contains(.shift) {
            addCursorAtNextOccurrence(self)
            return
        }

        // Cmd+Shift+L: Add cursors at all occurrences
        if event.charactersIgnoringModifiers == "l" && flags.contains([.command, .shift]) {
            addCursorsAtAllOccurrences(self)
            return
        }

        // Escape: Clear all cursors
        if event.keyCode == 53 { // Escape key
            clearAllCursors(self)
            return
        }

        super.keyDown(with: event)
    }
}

extension MainViewController: SyntaxTextViewDelegate {
    func theme(for appearance: NSAppearance) -> SyntaxColorTheme {
        return DefaultTheme(appearance: appearance)
    }

    func didChangeText(_ syntaxTextView: SyntaxTextView) {
        updateMultiCursorOverlay()
        // Reset cursor blinking when user types
        resetCursorBlinking()
    }

    func didChangeSelectedRange(_ syntaxTextView: SyntaxTextView, selectedRange: NSRange) {
        // Sync multi-cursor manager with text view selections
        multiCursorManager?.updateFromTextViewSelections()
        // Update overlay when selection changes
        updateMultiCursorOverlay()
        // Reset cursor blinking when selection changes
        resetCursorBlinking()
    }

    func didChangeFont(_ font: Font) {
        //
    }

    func lexerForSource(_ source: String) -> Lexer {
        return BoopLexer()
    }


}
