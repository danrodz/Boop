/**
  {
    "api": 1,
    "name": "WCAG Contrast Checker",
    "description": "Check color contrast ratio (format: foreground background)",
    "author": "Boop",
    "icon": "eye",
    "tags": "wcag,contrast,accessibility,a11y,color"
  }
**/

function main(state) {
  try {
    const parts = state.text.trim().split(/\s+/);

    if (parts.length < 2) {
      state.text = 'Format: #foreground #background\nExample: #000000 #ffffff';
      return;
    }

    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    function getLuminance(r, g, b) {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    const fg = hexToRgb(parts[0]);
    const bg = hexToRgb(parts[1]);

    if (!fg || !bg) {
      state.postError("Invalid hex color format");
      return;
    }

    const fgLum = getLuminance(fg.r, fg.g, fg.b);
    const bgLum = getLuminance(bg.r, bg.g, bg.b);

    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);
    const contrast = (lighter + 0.05) / (darker + 0.05);

    const result = [
      'WCAG Contrast Ratio Check:',
      '',
      `Foreground: ${parts[0]}`,
      `Background: ${parts[1]}`,
      '',
      `Contrast Ratio: ${contrast.toFixed(2)}:1`,
      '',
      'WCAG 2.1 Compliance:',
      '',
      'Normal Text (AA):',
      contrast >= 4.5 ? '✓ Pass (4.5:1 required)' : '✗ Fail (4.5:1 required)',
      '',
      'Large Text (AA):',
      contrast >= 3 ? '✓ Pass (3:1 required)' : '✗ Fail (3:1 required)',
      '',
      'Normal Text (AAA):',
      contrast >= 7 ? '✓ Pass (7:1 required)' : '✗ Fail (7:1 required)',
      '',
      'Large Text (AAA):',
      contrast >= 4.5 ? '✓ Pass (4.5:1 required)' : '✗ Fail (4.5:1 required)',
      '',
      'UI Components:',
      contrast >= 3 ? '✓ Pass (3:1 required)' : '✗ Fail (3:1 required)'
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error checking contrast: " + error.message);
  }
}
