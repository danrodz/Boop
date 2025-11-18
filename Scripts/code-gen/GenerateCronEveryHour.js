/**
  {
    "api": 1,
    "name": "Cron: Every Hour",
    "description": "Generates cron for every hour",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) { state.insert('0 * * * *'); }
