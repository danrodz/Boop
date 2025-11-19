/**
  {
    "api": 1,
    "name": "Decimal to Fraction",
    "description": "Convert decimal to fraction",
    "author": "Boop",
    "icon": "divide.circle",
    "tags": "decimal,fraction,convert,math"
  }
**/

function main(state) {
  try {
    const decimal = parseFloat(state.text.trim());

    if (isNaN(decimal)) {
      state.postError("Invalid decimal number");
      return;
    }

    function gcd(a, b) {
      return b === 0 ? a : gcd(b, a % b);
    }

    // Separate whole and fractional parts
    const whole = Math.floor(Math.abs(decimal));
    const fractional = Math.abs(decimal) - whole;

    if (fractional === 0) {
      state.text = whole.toString();
      return;
    }

    // Convert fractional part to fraction
    const precision = 1000000;
    let numerator = Math.round(fractional * precision);
    let denominator = precision;

    // Reduce fraction
    const divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;

    const sign = decimal < 0 ? '-' : '';

    if (whole === 0) {
      state.text = `${sign}${numerator}/${denominator}`;
    } else {
      state.text = `${sign}${whole} ${numerator}/${denominator}`;
    }
  } catch (error) {
    state.postError("Error converting to fraction: " + error.message);
  }
}
