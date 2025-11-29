/**
  {
    "api": 1,
    "name": "Convert Units",
    "description": "Convert between common units (format: value from to, e.g., 100 kg lb)",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "convert,units,measurement"
  }
**/

function main(state) {
  try {
    const parts = state.text.trim().split(/\s+/);

    if (parts.length !== 3) {
      state.postError("Format: value from to (e.g., 100 kg lb)");
      return;
    }

    const value = parseFloat(parts[0]);
    const from = parts[1].toLowerCase();
    const to = parts[2].toLowerCase();

    const conversions = {
      // Length
      'km_mi': 0.621371,
      'mi_km': 1.60934,
      'm_ft': 3.28084,
      'ft_m': 0.3048,
      'cm_in': 0.393701,
      'in_cm': 2.54,

      // Weight
      'kg_lb': 2.20462,
      'lb_kg': 0.453592,
      'g_oz': 0.035274,
      'oz_g': 28.3495,

      // Temperature
      'c_f': (v) => (v * 9/5) + 32,
      'f_c': (v) => (v - 32) * 5/9,
      'c_k': (v) => v + 273.15,
      'k_c': (v) => v - 273.15,
    };

    const key = `${from}_${to}`;
    const conversion = conversions[key];

    if (!conversion) {
      state.postError(`Unsupported conversion: ${from} to ${to}`);
      return;
    }

    const result = typeof conversion === 'function'
      ? conversion(value)
      : value * conversion;

    state.text = `${value} ${from} = ${result.toFixed(4)} ${to}`;
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
