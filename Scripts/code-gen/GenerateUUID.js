/**
  {
    "api": 1,
    "name": "Generate UUID v4",
    "description": "Generates a random UUID v4",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create"
  }
**/

import { randomUUID } from 'crypto';

function main(state) {
  state.insert(randomUUID());
}
