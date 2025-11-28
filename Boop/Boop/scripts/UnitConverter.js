/**
  {
    "api": 1,
    "name": "Unit Converter",
    "description": "Convert units (format: value from to, e.g., '100 kg lb')",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "unit,convert,measurement,length,weight,temperature"
  }
**/

function main(state) {
  const conversions = {
    // Length
    'm_ft': 3.28084,
    'ft_m': 0.3048,
    'km_mi': 0.621371,
    'mi_km': 1.60934,
    'cm_in': 0.393701,
    'in_cm': 2.54,

    // Weight
    'kg_lb': 2.20462,
    'lb_kg': 0.453592,
    'g_oz': 0.035274,
    'oz_g': 28.3495,

    // Temperature (special handling)
    'c_f': (c) => (c * 9/5) + 32,
    'f_c': (f) => (f - 32) * 5/9,
    'c_k': (c) => c + 273.15,
    'k_c': (k) => k - 273.15,

    // Volume
    'l_gal': 0.264172,
    'gal_l': 3.78541,
    'ml_floz': 0.033814,
    'floz_ml': 29.5735
  };

  try {
    const parts = state.text.trim().toLowerCase().split(/\s+/);

    if (parts.length < 3) {
      state.text = 'Format: <value> <from_unit> <to_unit>\n\nExamples:\n  100 kg lb\n  32 f c\n  5 km mi';
      return;
    }

    const value = parseFloat(parts[0]);
    const from = parts[1];
    const to = parts[2];
    const key = `${from}_${to}`;

    if (isNaN(value)) {
      state.postError("Invalid number");
      return;
    }

    if (conversions[key]) {
      const factor = conversions[key];
      const result = typeof factor === 'function' ? factor(value) : value * factor;
      state.text = `${value} ${from} = ${result.toFixed(4)} ${to}`;
    } else {
      state.postError(`Conversion ${from} to ${to} not supported`);
    }
  } catch (error) {
    state.postError("Error converting units: " + error.message);
  }
}
