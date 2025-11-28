/**
	{
		"api":1,
		"name":"Sort Tailwind Classes",
		"description":"Sorts Tailwind CSS classes in recommended order",
		"author":"Boop",
		"icon":"sort-alpha-asc",
		"tags":"tailwind,css,sort,classes,utility"
	}
**/

function main(state) {
	try {
		let text = state.text.trim();

		// Extract classes from className="..." or class="..."
		const inAttribute = text.match(/(?:class|className)=["']([^"']+)["']/);
		const classes = inAttribute ? inAttribute[1].split(/\s+/) : text.split(/\s+/);

		// Tailwind class order (based on official prettier plugin)
		const order = [
			// Layout
			'container', 'box-border', 'box-content', 'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'flow-root', 'hidden',
			// Position
			'static', 'fixed', 'absolute', 'relative', 'sticky',
			// Display & Visibility
			'visible', 'invisible', 'collapse',
			// Flex & Grid
			'flex-row', 'flex-col', 'flex-wrap', 'items-', 'justify-', 'gap-', 'grid-cols-',
			// Spacing
			'm-', 'mx-', 'my-', 'mt-', 'mr-', 'mb-', 'ml-',
			'p-', 'px-', 'py-', 'pt-', 'pr-', 'pb-', 'pl-',
			// Sizing
			'w-', 'h-', 'min-w-', 'min-h-', 'max-w-', 'max-h-',
			// Typography
			'text-', 'font-', 'leading-', 'tracking-', 'antialiased',
			// Backgrounds
			'bg-',
			// Borders
			'border', 'rounded',
			// Effects
			'shadow', 'opacity-',
			// Transitions
			'transition', 'duration-', 'ease-',
			// Others
			'cursor-', 'select-', 'overflow-'
		];

		const getPriority = (className) => {
			for (let i = 0; i < order.length; i++) {
				if (className.startsWith(order[i])) {
					return i;
				}
			}
			return 999;
		};

		const sorted = classes.sort((a, b) => {
			const priorityA = getPriority(a);
			const priorityB = getPriority(b);
			if (priorityA !== priorityB) {
				return priorityA - priorityB;
			}
			return a.localeCompare(b);
		});

		const result = sorted.join(' ');

		if (inAttribute) {
			state.text = text.replace(/(?:class|className)=["'][^"']+["']/, `${inAttribute[0].split('=')[0]}="${result}"`);
		} else {
			state.text = result;
		}
	}
	catch(error) {
		state.postError("Error sorting Tailwind classes: " + error.message);
	}
}
