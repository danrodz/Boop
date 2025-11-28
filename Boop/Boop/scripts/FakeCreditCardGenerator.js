/**
  {
    "api": 1,
    "name": "Fake Credit Card Generator",
    "description": "Generate fake credit card numbers for testing (Luhn-valid)",
    "author": "Boop",
    "icon": "creditcard",
    "tags": "fake,credit,card,generate,mock,test,luhn"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 5;

    if (count < 1 || count > 50) {
      state.postError("Count must be between 1 and 50");
      return;
    }

    function luhnCheck(num) {
      const arr = num.split('').reverse().map(n => parseInt(n));
      let sum = 0;

      for (let i = 0; i < arr.length; i++) {
        let digit = arr[i];
        if (i % 2 === 1) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
      }

      return (10 - (sum % 10)) % 10;
    }

    function generateCard(prefix, length) {
      let card = prefix;

      // Generate random digits
      while (card.length < length - 1) {
        card += Math.floor(Math.random() * 10);
      }

      // Add Luhn check digit
      card += luhnCheck(card);

      return card;
    }

    const cards = [];
    const types = [
      { name: 'Visa', prefix: '4', length: 16 },
      { name: 'Mastercard', prefix: '5', length: 16 },
      { name: 'Amex', prefix: '37', length: 15 },
      { name: 'Discover', prefix: '6011', length: 16 }
    ];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const card = generateCard(type.prefix, type.length);

      // Format card number
      const formatted = card.match(/.{1,4}/g).join(' ');

      cards.push(`${type.name.padEnd(12)} ${formatted}`);
    }

    state.text = cards.join('\n') + '\n\nNote: For testing only. These are fake numbers.';
    state.postInfo(`Generated ${count} fake card(s)`);
  } catch (error) {
    state.postError("Error generating cards: " + error.message);
  }
}
