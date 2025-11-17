//
//  MultiCursorOverlayView.swift
//  Boop
//
//  Custom overlay view for rendering multiple cursors visually
//

import Cocoa

class MultiCursorOverlayView: NSView {

    // MARK: - Properties

    weak var textView: NSTextView? {
        didSet {
            setupTextViewObservers()
        }
    }

    var cursorPositions: [Int] = [] {
        didSet {
            needsDisplay = true
            if cursorPositions.isEmpty {
                showNativeCursor()
            } else {
                hideNativeCursor()
            }
        }
    }

    private var blinkTimer: Timer?
    private var cursorVisible = true
    private let blinkInterval: TimeInterval = 0.53 // Match NSTextView's blink rate
    private var scrollObserver: NSObjectProtocol?

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

    private func setupTextViewObservers() {
        // Observe scroll events to update cursor positions
        if let scrollView = textView?.enclosingScrollView {
            scrollObserver = NotificationCenter.default.addObserver(
                forName: NSView.boundsDidChangeNotification,
                object: scrollView.contentView,
                queue: .main
            ) { [weak self] _ in
                self?.needsDisplay = true
            }
        }
    }

    // MARK: - Cursor Visibility

    private func hideNativeCursor() {
        guard let textView = textView else { return }
        // Hide the native cursor by making it transparent when multi-cursor is active
        textView.insertionPointColor = NSColor.clear
    }

    private func showNativeCursor() {
        guard let textView = textView else { return }
        // Restore the native cursor color
        textView.insertionPointColor = NSColor.controlTextColor
    }

    // MARK: - Cursor Blinking

    private func startBlinking() {
        blinkTimer?.invalidate()
        cursorVisible = true
        blinkTimer = Timer.scheduledTimer(withTimeInterval: blinkInterval, repeats: true) { [weak self] _ in
            self?.cursorVisible.toggle()
            self?.needsDisplay = true
        }
    }

    func resetBlinking() {
        cursorVisible = true
        startBlinking()
    }

    func stopBlinking() {
        blinkTimer?.invalidate()
        blinkTimer = nil
    }

    deinit {
        stopBlinking()
        if let observer = scrollObserver {
            NotificationCenter.default.removeObserver(observer)
        }
    }

    // MARK: - Drawing

    override func draw(_ dirtyRect: NSRect) {
        super.draw(dirtyRect)

        guard let textView = textView,
              cursorVisible,
              !cursorPositions.isEmpty else { return }

        guard let context = NSGraphicsContext.current?.cgContext else { return }
        guard let layoutManager = textView.layoutManager,
              let textContainer = textView.textContainer else { return }

        // Use the text view's insertion point color
        let cursorColor = NSColor.controlAccentColor
        context.setFillColor(cursorColor.cgColor)

        // Get the visible rect to skip drawing cursors outside visible area
        let visibleRect = textView.visibleRect

        // Draw a cursor line at each position
        for position in cursorPositions {
            guard position <= textView.string.count else { continue }

            // Get the glyph index for this character position
            let glyphIndex = layoutManager.glyphIndexForCharacter(at: position)

            // Get the bounding rect for the glyph
            var glyphRect = layoutManager.boundingRect(forGlyphRange: NSRange(location: glyphIndex, length: 0), in: textContainer)

            // If the rect is empty (at line end), use lineFragmentRect
            if glyphRect.width == 0 || glyphRect.height == 0 {
                let lineFragmentRect = layoutManager.lineFragmentRect(forGlyphAt: glyphIndex, effectiveRange: nil)
                glyphRect = NSRect(x: glyphRect.origin.x,
                                  y: lineFragmentRect.origin.y,
                                  width: 1,
                                  height: lineFragmentRect.height)
            }

            // Adjust for text container origin
            let textViewOrigin = textView.textContainerOrigin
            glyphRect.origin.x += textViewOrigin.x
            glyphRect.origin.y += textViewOrigin.y

            // Skip if not in visible rect (optimization for large documents)
            if !visibleRect.intersects(glyphRect) {
                continue
            }

            // Convert from text view coordinates to overlay view coordinates
            var cursorRect = glyphRect
            if let textViewSuperview = textView.superview,
               let overlaySuperview = self.superview,
               textViewSuperview == overlaySuperview {
                // If both views share the same superview, convert directly
                let pointInSuperview = textView.convert(cursorRect.origin, to: textViewSuperview)
                cursorRect.origin = convert(pointInSuperview, from: textViewSuperview)
            } else {
                // General case: convert through window
                let pointInWindow = textView.convert(cursorRect.origin, to: nil)
                cursorRect.origin = convert(pointInWindow, from: nil)
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

    // MARK: - Layout

    override func layout() {
        super.layout()
        needsDisplay = true
    }

    override func viewDidMoveToSuperview() {
        super.viewDidMoveToSuperview()
        setupTextViewObservers()
    }

    // MARK: - Mouse Events (pass through to text view)

    override func hitTest(_ point: NSPoint) -> NSView? {
        // Make this view transparent to mouse events
        return nil
    }
}
