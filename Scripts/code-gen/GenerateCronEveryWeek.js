/**
  {
    "api": 1,
    "name": "Cron: Every Week",
    "description": "Generates cron for weekly",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) { state.insert('0 0 * * 0'); }
