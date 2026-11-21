const symbols = {
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
};

function formatResult(operation, numbers, result) {
  if (operation === "average") {
    return `Average of ${numbers.join(", ")} = ${result}`;
  }
  const [first, second] = numbers;
  return `${first} ${symbols[operation]} ${second} = ${result}`;
}

module.exports = { formatResult };
