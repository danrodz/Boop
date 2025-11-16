/**
	{
		"api":1,
		"name":"CRC32 Checksum",
		"description":"Calculates the CRC32 checksum of your text (hex encoded)",
		"author":"danrodz",
		"icon":"fingerprint",
		"tags":"crc32,checksum,hash"
	}
**/

function main(state) {
	try {
		// Build CRC32 lookup table
		function makeCRCTable() {
			let c;
			const crcTable = [];
			for (let n = 0; n < 256; n++) {
				c = n;
				for (let k = 0; k < 8; k++) {
					c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
				}
				crcTable[n] = c;
			}
			return crcTable;
		}

		// Calculate CRC32
		function crc32(str) {
			const crcTable = makeCRCTable();
			let crc = 0 ^ (-1);

			for (let i = 0; i < str.length; i++) {
				crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
			}

			return (crc ^ (-1)) >>> 0;
		}

		// Convert to hex string
		const checksum = crc32(state.text);
		state.text = checksum.toString(16).toUpperCase().padStart(8, '0');

	} catch (error) {
		state.postError("Error calculating CRC32: " + error.message);
	}
}
