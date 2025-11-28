/**
  {
    "api": 1,
    "name": "Text to ASCII Banner",
    "description": "Convert text to large ASCII art banner",
    "author": "Boop",
    "icon": "textformat.size",
    "tags": "ascii,banner,art,text,large"
  }
**/

function main(state) {
  try {
    const text = state.text.toUpperCase().substring(0, 20);

    // Simple 5-line ASCII font
    const font = {
      'A': ['  A  ', ' A A ', 'AAAAA', 'A   A', 'A   A'],
      'B': ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
      'C': [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
      'D': ['DDD  ', 'D  D ', 'D   D', 'D  D ', 'DDD  '],
      'E': ['EEEEE', 'E    ', 'EEEE ', 'E    ', 'EEEEE'],
      'F': ['FFFFF', 'F    ', 'FFFF ', 'F    ', 'F    '],
      'G': [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
      'H': ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
      'I': ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
      'J': ['JJJJJ', '   J ', '   J ', 'J  J ', ' JJ  '],
      'K': ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
      'L': ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
      'M': ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
      'N': ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
      'O': [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
      'P': ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
      'Q': [' QQQ ', 'Q   Q', 'Q   Q', 'Q  Q ', ' QQ Q'],
      'R': ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
      'S': [' SSS ', 'S    ', ' SSS ', '    S', 'SSSS '],
      'T': ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
      'U': ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
      'V': ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
      'W': ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
      'X': ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
      'Y': ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
      'Z': ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
      ' ': ['     ', '     ', '     ', '     ', '     '],
      '0': [' 000 ', '0  00', '0 0 0', '00  0', ' 000 '],
      '1': ['  1  ', ' 11  ', '  1  ', '  1  ', '11111'],
      '2': [' 222 ', '2   2', '   2 ', '  2  ', '22222'],
      '3': [' 333 ', '3   3', '  33 ', '3   3', ' 333 '],
      '4': ['4   4', '4   4', '44444', '    4', '    4'],
      '5': ['55555', '5    ', '5555 ', '    5', '5555 '],
      '6': [' 666 ', '6    ', '6666 ', '6   6', ' 666 '],
      '7': ['77777', '    7', '   7 ', '  7  ', ' 7   '],
      '8': [' 888 ', '8   8', ' 888 ', '8   8', ' 888 '],
      '9': [' 999 ', '9   9', ' 9999', '    9', ' 999 '],
      '!': ['  !  ', '  !  ', '  !  ', '     ', '  !  '],
    };

    let result = ['', '', '', '', ''];

    for (let char of text) {
      const charLines = font[char] || font[' '];
      for (let i = 0; i < 5; i++) {
        result[i] += charLines[i] + ' ';
      }
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Failed to create ASCII banner: " + error.message);
  }
}
