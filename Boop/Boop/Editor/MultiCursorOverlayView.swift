//
//  MultiCursorOverlayView.swift
//  Boop
//
//  Custom overlay view for rendering multiple cursors visually
//

import Cocoa

class MultiCursorOverlayView: NSView {

    // MARK: - Properties

    weak var textView: NSTextView?
    var cursorPositions: [Int] = [] {
        didSet {
            needsDisplay = true
        }
    }

    private var blinkTimer: Timer?
    private var cursorVisible = true
    private let blinkInterval: TimeInterval = 0.5

    // MARK: - Initialization

    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        wantsLayer = true
        layer?.backgroundColor = NSColor.clear.cgColor
        startBlinking()
    }

    // MARK: - Cursor Blinking

    private func startBlinking() {
        blinkTimer?.invalidate()
        blinkTimer = Timer.scheduledTimer(withTimeInterval: blinkInterval, repeats: true) { [weak self] _ in
            self?.cursorVisible.toggle()
            self?.needsDisplay = true
        }
    }

    func stopBlinking() {
        blinkTimer?.invalidate()
        blinkTimer = nil
    }

    deinit {
        stopBlinking()
    }

    // MARK: - Drawing

    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)

        guard let textView = textView,
              cursorVisible,
              !cursorPositions.isEmpty else { return }

        guard let context = NSGraphicsContext.current?.cgContext else { return }

        // Use the text view's insertion point color
        let cursorColor = NSColor.controlAccentColor

        context.setFillColor(cursorColor.cgColor)

        // Draw a cursor line at each position
        for position in cursorPositions {
            guard position <= textView.string.count else { continue }

            // Get the rect for the cursor position
            guard let layoutManager = textView.layoutManager,
                  let textContainer = textView.textContainer else { continue }

            let glyphIndex = layoutManager.glyphIndexForCharacter(at: position)
            let glyphRect = layoutManager.boundingRect(forGlyphRange: NSRange(location: glyphIndex, length: 0), in: textContainer)

            // Convert to overlay view coordinates
            let textViewOrigin = textView.textContainerOrigin
            var cursorRect = glyphRect
            cursorRect.origin.x += textViewOrigin.x
            cursorRect.origin.y += textViewOrigin.y

            // Convert from text view coordinates to overlay coordinates
            if let convertedPoint = textView.superview?.convert(cursorRect.origin, to: self) {
                cursorRect.origin = convertedPoint
            }

            // Draw cursor line
            let cursorWidth: CGFloat = 2.0
            let cursorLine = NSRect(x: cursorRect.origin.x,
                                   y: cursorRect.origin.y,
                                   width: cursorWidth,
                                   height: cursorRect.height)

            context.fill(cursorLine)
        }
    }

    // MARK: - Mouse Events (pass through to text view)

    override func hitTest(_ point: NSPoint) -> NSView? {
        // Make this view transparent to mouse events
        return nil
    }
}
