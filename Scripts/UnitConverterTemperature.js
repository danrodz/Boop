/**
  {
    "api": 1,
    "name": "Unit Converter (Temperature)",
    "description": "Converts between Celsius, Fahrenheit, and Kelvin",
    "author": "Boop",
    "icon": "thermometer",
    "tags": "convert,temperature,celsius,fahrenheit,kelvin,units"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const match = input.match(/^([-\d.]+)\s*([cfk])/i);

    if (!match) {
      state.postError("Format: number + unit (e.g., '25 C', '77 F', '300 K')");
      return;
    }

    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    let celsius, fahrenheit, kelvin;

    if (unit === 'c') {
      celsius = value;
      fahrenheit = (value * 9/5) + 32;
      kelvin = value + 273.15;
    } else if (unit === 'f') {
      fahrenheit = value;
      celsius = (value - 32) * 5/9;
      kelvin = celsius + 273.15;
    } else if (unit === 'k') {
      kelvin = value;
      celsius = value - 273.15;
      fahrenheit = (celsius * 9/5) + 32;
    }

    const result = `UNIT CONVERTER (TEMPERATURE)

Input: ${value}°${unit.toUpperCase()}

Celsius: ${celsius.toFixed(2)}°C
Fahrenheit: ${fahrenheit.toFixed(2)}°F
Kelvin: ${kelvin.toFixed(2)} K`;

    state.text = result;

  } catch (error) {
    state.postError("Conversion failed: " + error.message);
  }
}
