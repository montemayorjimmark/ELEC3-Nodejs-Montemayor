// Name: Jim Mark Montemayor
// Section: IV-BSIT C
// Activity N2 - Modular Calculator

const path = require("node:path");
const operations = require("./operations");
const { formatResult } = require("./formatter");

function main() {
  const [operation, ...inputs] = process.argv.slice(2);

  if (!operation) {
    const scriptName = path.basename(process.argv[1]);
    throw new Error(`Usage: node ${scriptName} add 12 8`);
  }

  if (!Object.hasOwn(operations, operation)) {
    throw new Error(`Unknown operation "${operation}". Choose add, subtract, multiply, divide, or average.`);
  }

  if (operation === "average" ? inputs.length === 0 : inputs.length !== 2) {
    const required = operation === "average" ? "at least one number" : "exactly two numbers";
    throw new Error(`${operation} requires ${required}.`);
  }

  const numbers = inputs.map(Number);
  if (inputs.some((input) => input.trim() === "") ||
      numbers.some((number) => !Number.isFinite(number))) {
    throw new Error("Please enter valid numbers.");
  }

  const result = operation === "average"
    ? operations.average(numbers)
    : operations[operation](...numbers);

  console.log(formatResult(operation, numbers, result));
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
