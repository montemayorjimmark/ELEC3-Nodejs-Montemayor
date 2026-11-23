// Activity N2 - Modular Calculator

function add(first, second) {
  return first + second;
}

function subtract(first, second) {
  return first - second;
}

function multiply(first, second) {
  return first * second;
}

function divide(first, second) {
  if (second === 0) {
    throw new Error("Cannot divide by zero.");
  }
  return first / second;
}

function average(numbers) {
  const total = numbers.reduce((sum, number) => sum + number, 0);
  return total / numbers.length;
}

module.exports = { add, subtract, multiply, divide, average };
