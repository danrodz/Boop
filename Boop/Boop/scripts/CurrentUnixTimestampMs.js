/**
	{
		"api":1,
		"name":"Current Unix Timestamp (Milliseconds)",
		"description":"Outputs the current Unix timestamp in milliseconds.",
		"author":"Boop",
		"icon":"clock",
		"tags":"timestamp,unix,time,epoch,milliseconds,ms"
	}
**/

function main(state) {
	// Get current Unix timestamp in milliseconds
	const timestamp = Date.now();
	state.text = timestamp.toString();
}
