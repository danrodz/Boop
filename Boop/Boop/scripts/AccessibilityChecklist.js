/**
  {
    "api": 1,
    "name": "Accessibility Checklist",
    "description": "Generate WCAG 2.1 AA compliance checklist",
    "author": "Boop",
    "icon": "checklist",
    "tags": "accessibility,a11y,wcag,checklist,audit"
  }
**/

function main(state) {
  try {
    const type = state.text.trim().toLowerCase() || 'full';

    const checklists = {
      full: `WCAG 2.1 Level AA Compliance Checklist

## 1. Perceivable

### Text Alternatives
- [ ] All images have alt text
- [ ] Decorative images have alt=""
- [ ] Complex images have long descriptions
- [ ] Form buttons have descriptive text

### Time-based Media
- [ ] Video has captions
- [ ] Audio has transcripts
- [ ] Video has audio descriptions

### Adaptable
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Meaningful sequence of content
- [ ] Form labels associated with inputs

### Distinguishable
- [ ] Color contrast ratio ≥ 4.5:1 (normal text)
- [ ] Color contrast ratio ≥ 3:1 (large text, UI)
- [ ] Information not conveyed by color alone
- [ ] Text can be resized to 200%
- [ ] No background audio in speech

## 2. Operable

### Keyboard Accessible
- [ ] All functionality available via keyboard
- [ ] No keyboard trap
- [ ] Keyboard shortcuts don't conflict
- [ ] Focus visible for all interactive elements

### Enough Time
- [ ] Users can extend time limits
- [ ] Users can pause moving content
- [ ] No time limits for reading

### Seizures and Physical Reactions
- [ ] No content flashes more than 3 times/second

### Navigable
- [ ] Skip navigation link present
- [ ] Page title describes page
- [ ] Focus order is logical
- [ ] Link purpose clear from text
- [ ] Multiple ways to find pages
- [ ] Headings and labels descriptive

## 3. Understandable

### Readable
- [ ] Language of page identified (lang attr)
- [ ] Language of parts identified
- [ ] Unusual words defined

### Predictable
- [ ] Focus doesn't cause unexpected changes
- [ ] Input doesn't cause unexpected changes
- [ ] Navigation consistent across site
- [ ] Identification consistent

### Input Assistance
- [ ] Form errors identified
- [ ] Labels and instructions provided
- [ ] Error suggestions provided
- [ ] Error prevention for important data

## 4. Robust

### Compatible
- [ ] Valid HTML (no parsing errors)
- [ ] Name, role, value for all components
- [ ] Status messages use ARIA live regions

## Testing

- [ ] Test with keyboard only
- [ ] Test with screen reader
- [ ] Test at 200% zoom
- [ ] Test in high contrast mode
- [ ] Run automated tools (axe, WAVE)
- [ ] Manual review complete`,

      quick: `Quick Accessibility Checklist

High Priority:
- [ ] Proper heading hierarchy
- [ ] All images have alt text
- [ ] Color contrast passes
- [ ] Keyboard navigation works
- [ ] Form labels present
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Valid HTML
- [ ] ARIA attributes correct
- [ ] Screen reader tested

Medium Priority:
- [ ] Skip navigation link
- [ ] Page titles unique
- [ ] Link text descriptive
- [ ] Error messages clear
- [ ] Landmarks used
- [ ] Language set (lang attr)

Testing:
- [ ] Keyboard only test
- [ ] Screen reader test
- [ ] Automated scan (axe)
- [ ] 200% zoom test`,

      forms: `Form Accessibility Checklist

Labels:
- [ ] All inputs have labels
- [ ] Labels associated with inputs (for/id)
- [ ] Required fields marked (aria-required)
- [ ] Optional fields indicated

Validation:
- [ ] Errors identified clearly
- [ ] Error messages descriptive
- [ ] Errors linked to fields (aria-describedby)
- [ ] Inline validation available
- [ ] Success messages announced

Structure:
- [ ] Logical tab order
- [ ] Grouped related fields (fieldset/legend)
- [ ] Submit button clearly labeled
- [ ] Reset button justified
- [ ] Autocomplete attributes used

Input Types:
- [ ] Correct input types used
- [ ] Pattern attribute where needed
- [ ] Min/max values set
- [ ] Placeholder not sole label
- [ ] Help text associated (aria-describedby)

ARIA:
- [ ] aria-invalid for errors
- [ ] aria-live for dynamic feedback
- [ ] aria-describedby for hints
- [ ] aria-labelledby where appropriate`
    };

    const checklist = checklists[type];

    if (!checklist) {
      const available = Object.keys(checklists).join(', ');
      state.text = `Available checklists: ${available}`;
      return;
    }

    state.text = checklist;
  } catch (error) {
    state.postError("Error generating checklist: " + error.message);
  }
}
