/**
  {
    "api": 1,
    "name": "Age Calculator",
    "description": "Calculate age from birth date",
    "author": "Boop",
    "icon": "person.crop.circle",
    "tags": "age,calculate,birthday,years"
  }
**/

function main(state) {
  try {
    const birthDate = new Date(state.text.trim());

    if (isNaN(birthDate.getTime())) {
      state.postError("Invalid date format");
      return;
    }

    const today = new Date();

    // Calculate age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days alive
    const diffMs = today - birthDate;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next birthday
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    let result = `Birth date: ${birthDate.toDateString()}\n\n`;
    result += `=== AGE ===\n`;
    result += `${years} years, ${months} months, ${days} days\n\n`;
    result += `=== TOTAL ===\n`;
    result += `${totalMonths} months\n`;
    result += `${totalWeeks} weeks\n`;
    result += `${totalDays} days\n\n`;
    result += `=== NEXT BIRTHDAY ===\n`;
    result += `${nextBirthday.toDateString()}\n`;
    result += `in ${daysUntilBirthday} days`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
