/**
	{
		"api":1,
		"name":"Current Unix Timestamp",
		"description":"Outputs the current Unix timestamp in seconds.",
		"author":"danrodz",
		"icon":"clock",
		"tags":"timestamp,unix,time,epoch,seconds"
	}
**/

function main(state) {
	// Get current Unix timestamp in seconds
	const timestamp = Math.floor(Date.now() / 1000);
	state.text = timestamp.toString();
}
