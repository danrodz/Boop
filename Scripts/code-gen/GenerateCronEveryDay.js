/**
  {
    "api": 1,
    "name": "Cron: Every Day Midnight",
    "description": "Generates cron for midnight daily",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) { state.insert('0 0 * * *'); }
