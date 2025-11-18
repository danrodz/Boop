/**
	{
		"api":1,
		"name":"Hex Color Converter",
		"description":"Converts hex colors to RGB, RGBA, HSL, and HSLA formats",
		"author":"Boop",
		"icon":"palette",
		"tags":"color,hex,rgb,hsl,convert,css"
	}
**/

function main(state) {
	let hex = state.text.trim().replace('#', '');

	// Handle 3-digit hex
	if (hex.length === 3) {
		hex = hex.split('').map(c => c + c).join('');
	}

	if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
		state.postError("Invalid hex color. Use format: #RRGGBB or #RGB");
		return;
	}

	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	// Convert to HSL
	const rNorm = r / 255;
	const gNorm = g / 255;
	const bNorm = b / 255;

	const max = Math.max(rNorm, gNorm, bNorm);
	const min = Math.min(rNorm, gNorm, bNorm);
	const diff = max - min;

	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (diff !== 0) {
		s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

		switch (max) {
			case rNorm:
				h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6;
				break;
			case gNorm:
				h = ((bNorm - rNorm) / diff + 2) / 6;
				break;
			case bNorm:
				h = ((rNorm - gNorm) / diff + 4) / 6;
				break;
		}
	}

	const hDeg = Math.round(h * 360);
	const sPercent = Math.round(s * 100);
	const lPercent = Math.round(l * 100);

	const result = `Color: #${hex.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hex:    #${hex.toUpperCase()}
RGB:    rgb(${r}, ${g}, ${b})
RGBA:   rgba(${r}, ${g}, ${b}, 1)
HSL:    hsl(${hDeg}, ${sPercent}%, ${lPercent}%)
HSLA:   hsla(${hDeg}, ${sPercent}%, ${lPercent}%, 1)

CSS Variables:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--color: #${hex.toUpperCase()};
--color-rgb: ${r}, ${g}, ${b};
--color-hsl: ${hDeg}, ${sPercent}%, ${lPercent}%;

Tailwind (if custom):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
theme: {
  colors: {
    custom: '#${hex.toUpperCase()}'
  }
}`;

	state.text = result;
}
