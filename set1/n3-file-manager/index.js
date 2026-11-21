// Name: Jim Mark Montemayor
// Section: IV-BSIT C
// Activity: N3 - File Manager with fs and path

const fs = require("node:fs");
const path = require("node:path");

const filesDir = path.join(__dirname, "files");

function getFilePath(fileName) {
  if (!fileName || !/^[a-z0-9][a-z0-9 _.-]*\.txt$/i.test(fileName)) {
    throw new Error("Enter a .txt file name without folders, such as notes.txt.");
  }
  return path.join(filesDir, fileName);
}

function showContents(filePath) {
  const contents = fs.readFileSync(filePath, "utf8");
  console.log(contents.trimEnd());
}

function main() {
  const [command, fileName, ...words] = process.argv.slice(2);
  const text = words.join(" ");

  switch (command) {
    case "create":
      if (!text.trim()) {
        throw new Error('Usage: node index.js create notes.txt "Your text"');
      }
      fs.mkdirSync(filesDir, { recursive: true });
      fs.writeFileSync(getFilePath(fileName), text + "\n", { flag: "wx" });
      console.log(`Created ${fileName}.`);
      break;
    case "read":
      console.log(`Contents of ${path.basename(getFilePath(fileName))}:`);
      showContents(getFilePath(fileName));
      break;
    default:
      throw new Error("Choose a command: create or read.");
  }
}

try {
  main();
} catch (error) {
  const fileName = process.argv[3];
  if (error.code === "ENOENT") {
    console.error(`File not found: ${fileName}`);
  } else if (error.code === "EEXIST") {
    console.error(`File already exists: ${fileName}`);
  } else {
    console.error(`Error: ${error.message}`);
  }
  process.exitCode = 1;
}
