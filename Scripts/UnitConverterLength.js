/**
  {
    "api": 1,
    "name": "Unit Converter (Length)",
    "description": "Converts between common length units",
    "author": "Boop",
    "icon": "ruler.fill",
    "tags": "convert,length,units,metric,imperial,distance"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const match = input.match(/^([\d.]+)\s*([a-z]+)$/i);

    if (!match) {
      state.postError("Format: number + unit (e.g., '100 cm', '5 ft')");
      return;
    }

    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    // Convert everything to meters first
    const toMeters = {
      // Metric
      'km': 1000, 'kilometer': 1000, 'kilometers': 1000,
      'm': 1, 'meter': 1, 'meters': 1, 'metre': 1, 'metres': 1,
      'cm': 0.01, 'centimeter': 0.01, 'centimeters': 0.01,
      'mm': 0.001, 'millimeter': 0.001, 'millimeters': 0.001,

      // Imperial/US
      'mi': 1609.34, 'mile': 1609.34, 'miles': 1609.34,
      'yd': 0.9144, 'yard': 0.9144, 'yards': 0.9144,
      'ft': 0.3048, 'foot': 0.3048, 'feet': 0.3048,
      'in': 0.0254, 'inch': 0.0254, 'inches': 0.0254
    };

    if (!(unit in toMeters)) {
      state.postError("Unknown unit. Supported: km, m, cm, mm, mi, yd, ft, in");
      return;
    }

    const meters = value * toMeters[unit];

    const result = `UNIT CONVERTER (LENGTH)

Input: ${value} ${unit}

Metric:
${(meters / 1000).toFixed(4)} km (kilometers)
${meters.toFixed(4)} m (meters)
${(meters * 100).toFixed(4)} cm (centimeters)
${(meters * 1000).toFixed(4)} mm (millimeters)

Imperial/US:
${(meters / 1609.34).toFixed(4)} mi (miles)
${(meters / 0.9144).toFixed(4)} yd (yards)
${(meters / 0.3048).toFixed(4)} ft (feet)
${(meters / 0.0254).toFixed(4)} in (inches)`;

    state.text = result;

  } catch (error) {
    state.postError("Conversion failed: " + error.message);
  }
}
