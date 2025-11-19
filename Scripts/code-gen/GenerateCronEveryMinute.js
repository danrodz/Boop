/**
  {
    "api": 1,
    "name": "Cron: Every Minute",
    "description": "Generates cron for every minute",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) { state.insert('* * * * *'); }
