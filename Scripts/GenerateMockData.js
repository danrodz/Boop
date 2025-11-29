/**
  {
    "api": 1,
    "name": "Generate Mock Data",
    "description": "Generates mock data from JSON template (use $name, $email, etc.)",
    "author": "Boop",
    "icon": "person.3",
    "tags": "mock,data,generate,fake,test"
  }
**/

function main(state) {
  // Mock data generators
  var firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "David", "Elizabeth"];
  var lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  var domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com", "company.org"];
  var streets = ["Main St", "Oak Ave", "Cedar Ln", "Park Blvd", "Elm St", "Washington Ave"];
  var cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"];
  var companies = ["Acme Corp", "Globex", "Initech", "Umbrella", "Stark Industries", "Wayne Enterprises"];
  
  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  var generators = {
    "$firstName": function() { return random(firstNames); },
    "$lastName": function() { return random(lastNames); },
    "$name": function() { return random(firstNames) + " " + random(lastNames); },
    "$email": function() { return random(firstNames).toLowerCase() + randomInt(1, 99) + "@" + random(domains); },
    "$phone": function() { return "(" + randomInt(200, 999) + ") " + randomInt(200, 999) + "-" + randomInt(1000, 9999); },
    "$address": function() { return randomInt(100, 9999) + " " + random(streets); },
    "$city": function() { return random(cities); },
    "$zip": function() { return String(randomInt(10000, 99999)); },
    "$company": function() { return random(companies); },
    "$uuid": function() { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) { var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16); }); },
    "$id": function() { return randomInt(1, 10000); },
    "$date": function() { var d = new Date(Date.now() - randomInt(0, 365*24*60*60*1000)); return d.toISOString().split("T")[0]; },
    "$datetime": function() { return new Date(Date.now() - randomInt(0, 365*24*60*60*1000)).toISOString(); },
    "$bool": function() { return Math.random() > 0.5; },
    "$price": function() { return (randomInt(100, 10000) / 100).toFixed(2); },
    "$lorem": function() { return "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; }
  };
  
  var template = state.text;
  var count = 1;
  
  // Check for count directive
  var countMatch = template.match(/^\$count:\s*(\d+)\s*\n/);
  if (countMatch) {
    count = parseInt(countMatch[1]);
    template = template.replace(countMatch[0], "");
  }
  
  var results = [];
  
  for (var i = 0; i < count; i++) {
    var result = template;
    
    // Replace all placeholders
    for (var placeholder in generators) {
      var regex = new RegExp("\\" + placeholder.replace("$", "\\$"), "g");
      result = result.replace(regex, function() {
        var val = generators[placeholder]();
        return typeof val === "string" ? val : JSON.stringify(val);
      });
    }
    
    results.push(result);
  }
  
  // Try to parse as JSON for proper array output
  if (count > 1) {
    try {
      var parsed = results.map(function(r) { return JSON.parse(r); });
      state.text = JSON.stringify(parsed, null, 2);
    } catch (e) {
      state.text = results.join("\n---\n");
    }
  } else {
    state.text = results[0];
  }
  
  state.postInfo("Generated " + count + " record(s)");
}
