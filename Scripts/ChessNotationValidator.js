/**
  {
    "api": 1,
    "name": "Chess Notation Validator",
    "description": "Validate algebraic chess notation",
    "author": "Boop",
    "icon": "crown",
    "tags": "chess,notation,algebraic,validate"
  }
**/

function main(state) {
  try {
    const moves = state.text.trim().split(/\s+/);
    const errors = [];
    const validMoves = [];

    // Algebraic notation patterns
    const patterns = [
      /^[KQRBN][a-h]?[1-8]?x?[a-h][1-8][+#]?$/,  // Piece move
      /^[a-h][1-8][+#]?$/,                        // Pawn move
      /^[a-h]x[a-h][1-8][+#]?$/,                  // Pawn capture
      /^O-O(-O)?[+#]?$/,                          // Castling
      /^\d+\.$/,                                  // Move number
    ];

    for (let move of moves) {
      // Skip move numbers
      if (/^\d+\./.test(move)) continue;

      const isValid = patterns.some(pattern => pattern.test(move));

      if (isValid) {
        validMoves.push(move);
      } else {
        errors.push(`Invalid: ${move}`);
      }
    }

    let result = '';
    if (errors.length === 0) {
      result = `✓ All ${validMoves.length} moves are valid\n\n`;
      result += 'Valid algebraic notation';
    } else {
      result = `Found ${errors.length} error(s):\n\n`;
      result += errors.join('\n');
      result += `\n\nValid moves: ${validMoves.length}`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}
