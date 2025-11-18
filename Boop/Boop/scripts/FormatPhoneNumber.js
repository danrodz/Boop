/**
{
  "api": 1,
  "name": "Format Phone Numbers (US)",
  "description": "Formats 10-digit numbers as (XXX) XXX-XXXX",
  "author": "Boop",
  "icon": "phone",
  "tags": "phone,format,number,us"
}
**/

function main(state) {
  state.text = state.text.replace(/\b(\d{3})(\d{3})(\d{4})\b/g, '($1) $2-$3');
}
