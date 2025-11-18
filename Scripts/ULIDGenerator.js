/**
  {
    "api": 1,
    "name": "Generate ULID",
    "description": "Generate Universally Unique Lexicographically Sortable Identifier",
    "author": "Boop",
    "icon": "key",
    "tags": "ulid,id,generate,unique,sortable"
  }
**/

function main(state) {
  try {
    const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32
    const ENCODING_LEN = ENCODING.length;
    const TIME_LEN = 10;
    const RANDOM_LEN = 16;

    function encodeTime(now, len) {
      let mod;
      let str = '';
      for (let i = len; i > 0; i--) {
        mod = now % ENCODING_LEN;
        str = ENCODING.charAt(mod) + str;
        now = (now - mod) / ENCODING_LEN;
      }
      return str;
    }

    function encodeRandom(len) {
      let str = '';
      for (let i = 0; i < len; i++) {
        str += ENCODING.charAt(Math.floor(Math.random() * ENCODING_LEN));
      }
      return str;
    }

    const now = Date.now();
    const ulid = encodeTime(now, TIME_LEN) + encodeRandom(RANDOM_LEN);

    state.text = ulid;
  } catch (error) {
    state.postError("Failed to generate ULID: " + error.message);
  }
}
