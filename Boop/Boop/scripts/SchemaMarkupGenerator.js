/**
  {
    "api": 1,
    "name": "Schema Markup Generator",
    "description": "Generate schema.org JSON-LD markup (input: type - article, product, organization)",
    "author": "Boop",
    "icon": "doc.badge.gearshape",
    "tags": "schema,jsonld,seo,structured,data"
  }
**/

function main(state) {
  try {
    const type = state.text.trim().toLowerCase() || 'article';

    const schemas = {
      article: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Article Title",
        "author": {
          "@type": "Person",
          "name": "Author Name"
        },
        "datePublished": "2024-01-01",
        "dateModified": "2024-01-01",
        "description": "Article description"
      },

      product: {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Product Name",
        "description": "Product description",
        "brand": {
          "@type": "Brand",
          "name": "Brand Name"
        },
        "offers": {
          "@type": "Offer",
          "price": "99.99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },

      organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Organization Name",
        "url": "https://example.com",
        "logo": "https://example.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-555-5555",
          "contactType": "Customer Service"
        }
      },

      breadcrumb: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://example.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Category",
            "item": "https://example.com/category"
          }
        ]
      }
    };

    const schema = schemas[type];

    if (!schema) {
      state.text = 'Available types: article, product, organization, breadcrumb';
      return;
    }

    state.text = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  } catch (error) {
    state.postError("Error generating schema markup: " + error.message);
  }
}
