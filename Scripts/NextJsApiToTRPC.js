/**
  {
    "api": 1,
    "name": "Next.js API to tRPC",
    "description": "Convert Next.js API route to tRPC procedure",
    "author": "Boop",
    "icon": "code",
    "tags": "nextjs,trpc,api,convert,typescript"
  }
**/

function main(state) {
  const text = state.text;

  // Extract handler name and method
  const handlerMatch = text.match(/export\s+default\s+(?:async\s+)?function\s+(\w+)/);
  const methodMatch = text.match(/req\.method\s*===\s*['"](\w+)['"]/);

  const handlerName = handlerMatch ? handlerMatch[1] : 'handler';
  const method = methodMatch ? methodMatch[1].toLowerCase() : 'query';

  const procedureType = method === 'get' ? 'query' : 'mutation';

  const result = `import { z } from 'zod';
import { publicProcedure } from '~/server/api/trpc';

export const ${handlerName} = publicProcedure
  .input(z.object({
    // Add your input schema here
  }))
  .${procedureType}(async ({ input, ctx }) => {
    // Your logic here
    return { success: true };
  });`;

  state.text = result;
  state.postInfo("Converted to tRPC procedure");
}
