/**
	{
		"api":1,
		"name":"Generate TypeScript Interface",
		"description":"Generates TypeScript interfaces from JSON objects",
		"author":"Boop",
		"icon":"code",
		"tags":"typescript,interface,type,json,convert,generate"
	}
**/

function main(state) {
	try {
		const obj = JSON.parse(state.text);

		const getType = (value) => {
			if (value === null) return 'null';
			if (Array.isArray(value)) {
				if (value.length === 0) return 'any[]';
				const firstType = getType(value[0]);
				return `${firstType}[]`;
			}
			if (typeof value === 'object') return 'object';
			return typeof value;
		};

		const generateInterface = (obj, name = 'Root', indent = '') => {
			const lines = [`${indent}interface ${name} {`];

			for (const [key, value] of Object.entries(obj)) {
				const type = getType(value);

				if (type === 'object' && value !== null) {
					// Nested object
					const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
					lines.push(`${indent}  ${key}: ${nestedName};`);
				} else {
					lines.push(`${indent}  ${key}: ${type};`);
				}
			}

			lines.push(`${indent}}`);

			// Generate nested interfaces
			for (const [key, value] of Object.entries(obj)) {
				if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
					const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
					lines.push('');
					lines.push(...generateInterface(value, nestedName, indent).split('\n'));
				}
			}

			return lines.join('\n');
		};

		const result = generateInterface(obj);
		state.text = result;
	}
	catch(error) {
		state.postError("Invalid JSON: " + error.message);
	}
}
