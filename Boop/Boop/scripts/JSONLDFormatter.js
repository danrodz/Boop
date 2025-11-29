/**
	{
		"api":1,
		"name":"Format JSON-LD",
		"description":"Formats and validates JSON-LD structured data for SEO and rich snippets",
		"author":"Boop",
		"icon":"broom",
		"tags":"json-ld,seo,schema,structured-data,google"
	}
**/

function main(state) {
	try {
		const parsed = JSON.parse(state.text);

		// Validate JSON-LD structure
		if (!parsed['@context']) {
			state.postInfo("Warning: Missing @context property");
		}

		if (!parsed['@type']) {
			state.postInfo("Warning: Missing @type property");
		}

		// Format with proper indentation
		const formatted = JSON.stringify(parsed, null, 2);

		// Add helpful comments
		const result = `<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
${formatted}
</script>

<!--
Test your JSON-LD:
• Google Rich Results Test: https://search.google.com/test/rich-results
• Schema.org Validator: https://validator.schema.org/

Common @types:
• Article, NewsArticle, BlogPosting
• Product, Offer
• Organization, Person
• WebSite, WebPage
• Event, Recipe
-->`;

		state.text = result;
	}
	catch(error) {
		state.postError("Invalid JSON-LD: " + error.message);
	}
}
