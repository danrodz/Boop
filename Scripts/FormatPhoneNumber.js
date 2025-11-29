/**
  {
    "api": 1,
    "name": "Format Phone Number",
    "description": "Formats phone numbers to standard US format",
    "author": "Boop",
    "icon": "phone",
    "tags": "phone,format,number,us,telephone"
  }
**/

function main(state) {
  var digits = state.text.replace(/\D/g, "");
  
  if (digits.length === 10) {
    state.text = "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
  } else if (digits.length === 11 && digits[0] === "1") {
    state.text = "+1 (" + digits.slice(1, 4) + ") " + digits.slice(4, 7) + "-" + digits.slice(7);
  } else {
    state.postError("Expected 10-digit US number or 11-digit with country code");
    return;
  }
  
  state.postInfo("Phone number formatted");
}
