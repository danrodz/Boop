/**
  {
    "api": 1,
    "name": "SVG Path Parser",
    "description": "Parse and explain SVG path commands",
    "author": "Boop",
    "icon": "pencil.and.outline",
    "tags": "svg,path,parse,d,graphics"
  }
**/

function main(state) {
  try {
    const path = state.text.trim();

    // Extract d attribute if full SVG path is provided
    let d = path;
    const dMatch = path.match(/d="([^"]+)"/);
    if (dMatch) {
      d = dMatch[1];
    }

    const commands = {
      'M': 'Move to (absolute)',
      'm': 'Move to (relative)',
      'L': 'Line to (absolute)',
      'l': 'Line to (relative)',
      'H': 'Horizontal line (absolute)',
      'h': 'Horizontal line (relative)',
      'V': 'Vertical line (absolute)',
      'v': 'Vertical line (relative)',
      'C': 'Cubic Bezier curve (absolute)',
      'c': 'Cubic Bezier curve (relative)',
      'S': 'Smooth cubic Bezier (absolute)',
      's': 'Smooth cubic Bezier (relative)',
      'Q': 'Quadratic Bezier (absolute)',
      'q': 'Quadratic Bezier (relative)',
      'T': 'Smooth quadratic Bezier (absolute)',
      't': 'Smooth quadratic Bezier (relative)',
      'A': 'Arc (absolute)',
      'a': 'Arc (relative)',
      'Z': 'Close path',
      'z': 'Close path'
    };

    const result = ['SVG Path Analysis:', '', 'Commands:'];

    // Parse commands
    const cmdPattern = /([MmLlHhVvCcSsQqTtAaZz])\s*([^MmLlHhVvCcSsQqTtAaZz]*)/g;
    let match;
    let cmdCount = 0;

    while ((match = cmdPattern.exec(d)) !== null) {
      const cmd = match[1];
      const params = match[2].trim();

      cmdCount++;
      result.push(`${cmdCount}. ${cmd} - ${commands[cmd]}`);
      if (params) {
        result.push(`   Parameters: ${params}`);
      }
    }

    result.push('');
    result.push(`Total commands: ${cmdCount}`);
    result.push(`Path length: ${d.length} characters`);

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error parsing SVG path: " + error.message);
  }
}
