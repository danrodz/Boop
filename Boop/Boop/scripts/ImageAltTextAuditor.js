/**
  {
    "api": 1,
    "name": "Image Alt Text Auditor",
    "description": "Audit images for accessibility (missing alt, decorative images, etc.)",
    "author": "Boop",
    "icon": "photo.badge.checkmark",
    "tags": "image,alt,accessibility,a11y,audit"
  }
**/

function main(state) {
  try {
    const html = state.text;
    const imgPattern = /<img\s+([^>]*?)>/gi;
    const images = [];
    let match;

    while ((match = imgPattern.exec(html)) !== null) {
      const attrs = match[1];

      // Extract attributes
      const srcMatch = attrs.match(/src=["']([^"']+)["']/);
      const altMatch = attrs.match(/alt=["']([^"']*)["']/);

      images.push({
        src: srcMatch ? srcMatch[1] : 'unknown',
        alt: altMatch ? altMatch[1] : null,
        hasAlt: altMatch !== null,
        fullTag: match[0]
      });
    }

    if (images.length === 0) {
      state.postError("No images found in HTML");
      return;
    }

    const result = ['Image Accessibility Audit:', ''];

    const missing = images.filter(img => !img.hasAlt);
    const empty = images.filter(img => img.hasAlt && img.alt === '');
    const suspect = images.filter(img => img.hasAlt && img.alt &&
      (img.alt.length < 5 || /image|picture|photo/i.test(img.alt)));

    result.push(`Total images: ${images.length}`);
    result.push(`Missing alt attribute: ${missing.length}`);
    result.push(`Empty alt (decorative): ${empty.length}`);
    result.push(`Potentially poor alt text: ${suspect.length}`);
    result.push('');

    if (missing.length > 0) {
      result.push('❌ Missing alt attribute:');
      missing.forEach(img => {
        result.push(`  - ${img.src}`);
      });
      result.push('');
    }

    if (suspect.length > 0) {
      result.push('⚠️  Potentially poor alt text:');
      suspect.forEach(img => {
        result.push(`  - "${img.alt}" for ${img.src}`);
      });
      result.push('');
    }

    if (empty.length > 0) {
      result.push('ℹ️  Decorative images (alt=""):');
      empty.forEach(img => {
        result.push(`  - ${img.src}`);
      });
      result.push('');
    }

    result.push('Best Practices:');
    result.push('- All images need alt attribute');
    result.push('- Use alt="" for decorative images');
    result.push('- Describe content, not "image of"');
    result.push('- Keep alt text concise (<125 chars)');
    result.push('- Avoid redundant phrases like "picture of"');

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error auditing images: " + error.message);
  }
}
