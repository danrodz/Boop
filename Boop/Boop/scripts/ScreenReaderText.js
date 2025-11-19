/**
  {
    "api": 1,
    "name": "Screen Reader Text Helper",
    "description": "Generate visually hidden text for screen readers",
    "author": "Boop",
    "icon": "speaker.wave.2",
    "tags": "screenreader,sr-only,accessibility,a11y,hidden"
  }
**/

function main(state) {
  try {
    const text = state.text.trim();

    if (!text) {
      state.text = `<!-- Example usage: Icons, "Read more" links, skip links -->

<!-- CSS for screen reader only text -->
<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
</style>

<!-- Usage Examples -->

<!-- Skip link -->
<a href="#main-content" class="sr-only sr-only-focusable">
  Skip to main content
</a>

<!-- Icon with description -->
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  <span class="sr-only">Settings</span>
</button>

<!-- Read more link -->
<a href="/article">
  Read more
  <span class="sr-only">about Article Title</span>
</a>`;
      return;
    }

    const result = `<!-- Screen reader only text -->
<span class="sr-only">${text}</span>

<!-- With focusable option (e.g., skip links) -->
<span class="sr-only sr-only-focusable">${text}</span>

<!-- CSS (add to your stylesheet) -->
<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>`;

    state.text = result;
  } catch (error) {
    state.postError("Error generating screen reader text: " + error.message);
  }
}
