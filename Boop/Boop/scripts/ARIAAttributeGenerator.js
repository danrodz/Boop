/**
  {
    "api": 1,
    "name": "ARIA Attribute Generator",
    "description": "Generate ARIA attributes for common UI patterns (button, menu, dialog, etc.)",
    "author": "Boop",
    "icon": "accessibility",
    "tags": "aria,accessibility,a11y,attributes,wcag"
  }
**/

function main(state) {
  try {
    const type = state.text.trim().toLowerCase();

    const patterns = {
      button: `<button type="button" aria-label="Descriptive button text">
  Click me
</button>`,

      menu: `<nav role="navigation" aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="#" role="menuitem">Home</a>
    </li>
    <li role="none">
      <button role="menuitem" aria-haspopup="true" aria-expanded="false">
        Menu
      </button>
    </li>
  </ul>
</nav>`,

      dialog: `<div role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc" aria-modal="true">
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-desc">Dialog description</p>
  <button aria-label="Close dialog">×</button>
</div>`,

      tabs: `<div role="tablist" aria-label="Tab group name">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
    Tab 1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
    Tab 2
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Panel 1 content
</div>`,

      accordion: `<div>
  <h3>
    <button aria-expanded="false" aria-controls="section-1">
      Section 1
    </button>
  </h3>
  <div id="section-1" hidden>
    Section content
  </div>
</div>`,

      alert: `<div role="alert" aria-live="assertive" aria-atomic="true">
  Important message here
</div>`,

      form: `<form>
  <label for="name">Name: <span aria-label="required">*</span></label>
  <input
    type="text"
    id="name"
    name="name"
    aria-required="true"
    aria-describedby="name-hint"
    aria-invalid="false"
  />
  <span id="name-hint">Please enter your full name</span>
  <span role="alert" aria-live="polite" id="name-error"></span>
</form>`,

      breadcrumb: `<nav aria-label="Breadcrumb">
  <ol role="list">
    <li><a href="/">Home</a></li>
    <li><a href="/category">Category</a></li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>`
    };

    const pattern = patterns[type];

    if (!pattern) {
      const available = Object.keys(patterns).join(', ');
      state.text = `Available patterns: ${available}`;
      return;
    }

    state.text = pattern;
  } catch (error) {
    state.postError("Error generating ARIA attributes: " + error.message);
  }
}
