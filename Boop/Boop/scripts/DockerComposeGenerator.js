/**
  {
    "api": 1,
    "name": "Docker Compose Generator",
    "description": "Generate docker-compose.yml (input: service type - web, db, redis, full)",
    "author": "Boop",
    "icon": "shippingbox.fill",
    "tags": "docker,compose,yaml,container,devops"
  }
**/

function main(state) {
  try {
    const type = state.text.trim().toLowerCase() || 'full';

    const templates = {
      web: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./app:/app
    restart: unless-stopped`,

      db: `version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:`,

      redis: `version: '3.8'

services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    command: redis-server --appendonly yes

volumes:
  redis_data:`,

      full: `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./app:/app
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    name: app-network`
    };

    const template = templates[type];

    if (!template) {
      const available = Object.keys(templates).join(', ');
      state.text = `Available templates: ${available}`;
      return;
    }

    state.text = template;
  } catch (error) {
    state.postError("Error generating docker-compose: " + error.message);
  }
}
