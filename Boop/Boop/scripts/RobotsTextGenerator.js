/**
  {
    "api": 1,
    "name": "Robots.txt Generator",
    "description": "Generate robots.txt file (input: allow or disallow)",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "robots,txt,seo,crawl,bot"
  }
**/

function main(state) {
  try {
    const type = state.text.trim().toLowerCase() || 'allow';

    const templates = {
      allow: `# Allow all bots
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml`,

      disallow: `# Disallow all bots
User-agent: *
Disallow: /`,

      selective: `# Selective access
User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Allow: /api/public/

User-agent: Googlebot
Allow: /

Sitemap: https://example.com/sitemap.xml`,

      staging: `# Staging environment - no indexing
User-agent: *
Disallow: /

# Block all crawlers from staging site`
    };

    const robots = templates[type];

    if (!robots) {
      state.text = 'Available types: allow, disallow, selective, staging';
      return;
    }

    state.text = robots;
  } catch (error) {
    state.postError("Error generating robots.txt: " + error.message);
  }
}
