/**
  {
    "api": 1,
    "name": "Generate Prisma Schema",
    "description": "Generate Prisma schema from model name",
    "author": "Boop",
    "icon": "cube.box",
    "tags": "prisma,schema,orm,database"
  }
**/

function main(state) {
  try {
    const modelName = state.text.trim() || 'User';

    let schema = `// Prisma Schema\n\n`;
    schema += `generator client {\n`;
    schema += `  provider = "prisma-client-js"\n`;
    schema += `}\n\n`;
    schema += `datasource db {\n`;
    schema += `  provider = "postgresql"\n`;
    schema += `  url      = env("DATABASE_URL")\n`;
    schema += `}\n\n`;
    schema += `model ${modelName} {\n`;
    schema += `  id        Int      @id @default(autoincrement())\n`;
    schema += `  email     String   @unique\n`;
    schema += `  name      String?\n`;
    schema += `  isActive  Boolean  @default(true)\n`;
    schema += `  createdAt DateTime @default(now())\n`;
    schema += `  updatedAt DateTime @updatedAt\n\n`;
    schema += `  @@map("${modelName.toLowerCase()}s")\n`;
    schema += `}\n`;

    state.text = schema;
  } catch (error) {
    state.postError("Failed to generate schema: " + error.message);
  }
}
