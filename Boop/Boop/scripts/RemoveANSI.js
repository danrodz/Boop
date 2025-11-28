/**
	{
		"api":1,
		"name":"Remove ANSI Colors",
		"description":"Strips ANSI color codes and escape sequences from terminal output",
		"author":"Boop",
		"icon":"remove",
		"tags":"ansi,color,escape,terminal,clean,strip"
	}
**/

function main(state) {
	// Remove all ANSI escape sequences
	// Pattern matches: ESC[...m (colors, styles) and ESC[...J/K (clear screen)
	const ansiPattern = /\x1B\[[0-9;]*[a-zA-Z]/g;

	const cleaned = state.text.replace(ansiPattern, '');

	state.text = cleaned;
}
